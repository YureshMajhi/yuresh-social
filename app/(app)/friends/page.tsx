"use client";

import FriendRequests from "@/app/components/Friends/FriendRequests";
import PeopleYouMayKnow from "@/app/components/Friends/PeopleYouMayKnow";
import SearchFriends from "@/app/components/Friends/SearchFriends";
import { FriendRequestsType, User } from "@/app/lib/definitions";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Friends = () => {
  const [unknownUsers, setUnknownUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequestsType[]>([]);
  const [currentUser, setCurrentUser] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user.uid);

        const sentQuery = query(
          collection(db, "friendRequests"),
          where("from", "==", user.uid),
          where("status", "==", "requested"),
        );
        const receivedQuery = query(
          collection(db, "friendRequests"),
          where("to", "==", user.uid),
          where("status", "==", "requested"),
        );

        const [sentSnap, receivedSnap] = await Promise.all([
          getDocs(sentQuery),
          getDocs(receivedQuery),
        ]);

        const myRequests: FriendRequestsType[] = [
          ...sentSnap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<FriendRequestsType, "id">),
          })),
          ...receivedSnap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<FriendRequestsType, "id">),
          })),
        ];
        setRequests(myRequests);
      }
    });

    return () => unsubscribe();
  }, []);

  // set realtime listeners for friendRequests
  useEffect(() => {
    if (!currentUser) return;

    const sentQuery = query(
      collection(db, "friendRequests"),
      where("from", "==", currentUser),
      where("status", "==", "requested"),
    );

    const receivedQuery = query(
      collection(db, "friendRequests"),
      where("to", "==", currentUser),
      where("status", "==", "requested"),
    );

    const unsubscribeSent = onSnapshot(sentQuery, (snapshot) => {
      const updated = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<FriendRequestsType, "id">),
      }));
      setRequests((prev) => [...prev.filter((r) => r.from !== currentUser), ...updated]);
    });

    const unsubscribeReceived = onSnapshot(receivedQuery, (snapshot) => {
      const updated = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<FriendRequestsType, "id">),
      }));
      setRequests((prev) => [...prev.filter((r) => r.to !== currentUser), ...updated]);
    });

    return () => {
      unsubscribeSent();
      unsubscribeReceived();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) return;

    const updateUsers = async () => {
      const userQuery = query(collection(db, "users"), limit(50));
      const usersSnapshot = await getDocs(userQuery);

      const userData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const involvedUserIds = new Set(requests.flatMap((req) => [req.from, req.to]));
      const filtered = userData.filter(
        (u) => u.id !== currentUser && !involvedUserIds.has(u.id),
      );

      setUnknownUsers(filtered);
    };

    updateUsers();
  }, [requests, currentUser]);

  return (
    <>
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6 overflow-y-auto items-start pb-20">
        <div className="flex-1 w-full flex flex-col gap-8 bg-white/40 backdrop-blur-xl rounded-4xl p-6 lg:p-8 shadow-sm border border-white/60 min-h-full max-h-full overflow-auto">
          <FriendRequests requests={requests} currentUser={currentUser} />
          <PeopleYouMayKnow unknownUsers={unknownUsers} />
        </div>

        <SearchFriends unknownUsers={unknownUsers} />
      </main>
    </>
  );
};

export default Friends;
