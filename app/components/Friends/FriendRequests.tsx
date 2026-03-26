"use client";

import { FriendRequestsType, User } from "@/app/lib/definitions";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const FriendRequests = ({
  requests,
  currentUser,
}: {
  requests: FriendRequestsType[];
  currentUser: string;
}) => {
  const [otherUsers, setOtherUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (requests.length === 0) return;

      const otherUserIds = requests.map((req) =>
        req.from === currentUser ? req.to : req.from,
      );

      const uniqueOtherUserIds = Array.from(new Set(otherUserIds));

      const batches: string[][] = [];
      for (let i = 0; i < uniqueOtherUserIds.length; i += 10) {
        batches.push(uniqueOtherUserIds.slice(i, i + 10));
      }

      const allUsers: User[] = [];
      for (const batch of batches) {
        const usersRef = collection(db, "users");
        const usersQuery = query(usersRef, where("__name__", "in", batch));
        const usersSnapshot = await getDocs(usersQuery);

        const batchUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];

        allUsers.push(...batchUsers);
      }

      const usersWithReqStatus = allUsers
        .map((user) => {
          const req = requests.find(
            (r) =>
              (r.from === currentUser && r.to === user.id) ||
              (r.to === currentUser && r.from === user.id),
          );

          return {
            ...user,
            friendRequestStatus: req
              ? ((req.from === currentUser ? "Sent" : "Requested") as
                  | "Sent"
                  | "Requested"
                  | "Accepted")
              : undefined,
          };
        })
        .sort((a, b) =>
          (a.friendRequestStatus || "").localeCompare(b.friendRequestStatus || ""),
        );

      setOtherUsers(usersWithReqStatus);
    };

    fetchOtherUsers();
  }, [requests, currentUser]);

  if (otherUsers.length === 0) return;

  return (
    <>
      <section className="flex flex-col gap-5">
        <h2 className="text-xl tracking-tight font-medium text-gray-800">
          Friend Requests
        </h2>

        {otherUsers.map((user) => (
          <div key={user.id} className="flex flex-col gap-3">
            <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Eric"
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">{user.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Mutual"
                      className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">6 mutual friends</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user?.friendRequestStatus === "Requested" ? (
                  <>
                    <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                      Accept
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                      Decline
                    </button>
                  </>
                ) : (
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                    Sent
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default FriendRequests;
