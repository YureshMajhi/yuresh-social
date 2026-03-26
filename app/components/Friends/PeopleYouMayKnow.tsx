"use client";

import { sendFriendRequest } from "@/app/lib/actions/firebaseAuth";
import { FriendRequests, User } from "@/app/lib/definitions";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequests[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userQuery = query(collection(db, "users"), limit(50));
        const usersSnapshot = await getDocs(userQuery);

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
        const myRequests: FriendRequests[] = [
          ...sentSnap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<FriendRequests, "id">),
          })),
          ...receivedSnap.docs.map((d) => ({
            id: d.id,
            ...(d.data() as Omit<FriendRequests, "id">),
          })),
        ];
        setRequests(myRequests);

        const userData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const involvedUserIds = new Set(myRequests.flatMap((req) => [req.from, req.to]));
        const filtered = userData.filter(
          (u) => u.id !== user.uid && !involvedUserIds.has(u.id),
        );
        setUsers(filtered);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <section className="flex flex-col gap-5 mt-2">
        <h2 className="text-xl tracking-tight font-medium text-gray-800">
          People you may know
        </h2>

        <div className="flex flex-col gap-3">
          {users &&
            users.map((user) => (
              <div
                key={user.id}
                className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=9"
                    alt="Laura"
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">
                      {user.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img
                        src="https://i.pravatar.cc/150?img=20"
                        alt="Mutual"
                        className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                      />
                      <span className="text-sm text-gray-500">6 mutual friends</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => sendFriendRequest(user.id)}
                  className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  Add Friend
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default PeopleYouMayKnow;
