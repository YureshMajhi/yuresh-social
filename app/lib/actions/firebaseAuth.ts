import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
      },
      { merge: true },
    );
  } catch (error) {
    console.log(error);
  }
}

export async function signout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    const [snap] = await Promise.all([getDocs(q)]);

    if (!snap.empty) {
      console.log("Invalid request format.");
      return;
    }

    // Accept request
    await addDoc(collection(db, "friendRequests"), {
      to: currentUser.uid,
      from: fromUserId,
      status: "requested",
      createdAt: serverTimestamp(),
    });
    console.log("Friend request accepted");
  } catch (error) {
    console.log(error);
  }
}
