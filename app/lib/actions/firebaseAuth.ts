import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Message, User } from "../definitions";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        name_lowercase: user.displayName?.toLocaleLowerCase(),
        email: user.email,
      },
      { merge: true },
    );
  } catch (error) {
    console.error(error);
  }
}

export async function signout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
}

export async function sendFriendRequest(toUserId: string) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    if (currentUser.uid === toUserId) {
      throw new Error("You can't send a request to yourself.");
    }

    const requestRefs = collection(db, "friendRequests");

    //Check if friend request already exists
    const q1 = query(
      requestRefs,
      where("from", "==", currentUser.uid),
      where("to", "==", toUserId),
    );
    const q2 = query(
      requestRefs,
      where("from", "==", toUserId),
      where("to", "==", currentUser.uid),
    );
    const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    if (!snap1.empty || !snap2.empty) {
      console.log("Request already exists");
      return;
    }

    // Send request
    await addDoc(collection(db, "friendRequests"), {
      from: currentUser.uid,
      to: toUserId,
      status: "requested",
      createdAt: serverTimestamp(),
    });
    console.log("Friend request sent");
  } catch (error) {
    console.error(error);
  }
}

export async function acceptFriendRequest(fromUserId: string) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error("User not authenticated.");
    }

    if (currentUser.uid === fromUserId) {
      throw new Error("Invalid friend request.");
    }

    const requestRefs = collection(db, "friendRequests");

    //Check if friend request already exists
    const q = query(
      requestRefs,
      where("from", "==", fromUserId),
      where("to", "==", currentUser.uid),
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      console.log("No request found.");
      return;
    }

    // check status before updating
    const doc = snap.docs[0];
    const data = doc.data();
    if (data.status === "accepted") {
      console.log("Request is already accepted.");
      return;
    }

    // Accept request
    const docRef = snap.docs[0].ref;
    await updateDoc(docRef, {
      status: "accepted",
      acceptedAt: serverTimestamp(),
    });
    console.log("Friend request accepted");

    await addDoc(collection(db, "conversations"), {
      users: [fromUserId, currentUser.uid],
      lastMessage: "",
      lastTimeStamp: serverTimestamp(),
      createdAt: serverTimestamp(),
    });

    console.log("Conversation Created");
  } catch (error) {
    console.error(error);
  }
}

export const searchUsersByName = async (searchQuery: string) => {
  if (!searchQuery) return [];

  const currentUser = auth.currentUser;

  try {
    const usersRef = collection(db, "users");
    const friendReqRef = collection(db, "friendRequests");

    const q = query(
      usersRef,
      orderBy("name_lowercase"),
      where("name_lowercase", ">=", searchQuery.toLocaleLowerCase()),
      where("name_lowercase", "<=", searchQuery.toLocaleLowerCase() + "\uf8ff"),
    );
    const snapshot = await getDocs(q);

    const reqQuery = query(friendReqRef, where("from", "==", currentUser?.uid));
    const reqQuery2 = query(friendReqRef, where("to", "==", currentUser?.uid));

    const [snap1, snap2] = await Promise.all([getDocs(reqQuery), getDocs(reqQuery2)]);

    const excludeIds = new Set<string>();
    snap1.forEach((doc) => excludeIds.add(doc.data().to));
    snap2.forEach((doc) => excludeIds.add(doc.data().from));

    const users = snapshot.docs
      .filter((doc) => doc.id !== currentUser?.uid)
      .map((doc) => ({
        id: doc.id,
        friendRequestStatus: (excludeIds.has(doc.id)
          ? "done"
          : "none") as User["friendRequestStatus"],
        ...doc.data(),
      }));

    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export async function fetchUserConversations() {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("User not authenticated.");

  try {
    const conversationRef = collection(db, "conversations");

    const q = query(conversationRef, where("users", "array-contains", currentUser.uid));

    const snap = await getDocs(q);
    const conversations = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return conversations;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getUserById(userId: string) {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByConversationId(conversationId: string) {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    console.error("User not authenticated.");
    return null;
  }
  try {
    const conversationRef = doc(db, "conversations", conversationId);

    const snap = await getDoc(conversationRef);
    if (!snap.exists()) {
      console.error("Conversation Doesnot exist");
      return null;
    }

    const users: string[] = snap.data()?.users || [];
    const otherUserId = users.find((user) => user !== currentUser.uid);
    if (!otherUserId) {
      console.error("User Doesnot exist in conversation");
      return null;
    }

    const result = await getUserById(otherUserId);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function sendMessage(
  conversationId: string,
  message: string,
  imageUrl: string,
) {
  if (!conversationId) {
    throw new Error("Invalid Conversation link.");
  }

  if (!imageUrl) {
    if (!message) {
      throw new Error("Empty message.");
    }
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated.");
  }

  try {
    const conversationRef = doc(db, "conversations", conversationId);

    const snap = await getDoc(conversationRef);
    if (!snap.exists()) {
      console.log("No conversations found.");
      return;
    }

    await addDoc(collection(db, "messages"), {
      conversationId,
      from: currentUser.uid,
      message,
      imageUrl: imageUrl || "",
      createdAt: serverTimestamp(),
    });

    await updateDoc(conversationRef, {
      lastMessage: message,
      lastTimeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

// export async function fetchMessages(conversationId: string) {
//   if (!conversationId) {
//     throw new Error("Invalid Conversation link.");
//   }

//   const currentUser = auth.currentUser;
//   if (!currentUser) {
//     throw new Error("User not authenticated.");
//   }

//   try {
//     const messagesRef = collection(db, "messages");

//     const q = query(
//       messagesRef,
//       where("conversationId", "==", conversationId),
//       orderBy("createdAt", "desc"),
//       limit(25),
//     );
//     const snap = await getDocs(q);

//     if (snap.empty) return [];

//     const messages = snap.docs
//       .map((doc) => ({
//         id: doc.id,
//         ownMessage: doc.data().from === currentUser.uid,
//         ...doc.data(),
//       }))
//       .reverse();

//     return messages;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }
