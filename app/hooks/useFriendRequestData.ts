"use client";

import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FriendRequestsType, User } from "../lib/definitions";

export const useFriendRequestData = ({
  requests,
  currentUser,
}: {
  requests: FriendRequestsType[];
  currentUser: string;
}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (requests.length === 0) return;

      const filteredRequests = requests.filter((d) => d.status !== "accepted");

      const userIds = filteredRequests.map((req) =>
        req.from === currentUser ? req.to : req.from,
      );

      const uniqueOtherUserIds = Array.from(new Set(userIds));

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
              ? ((req.from === currentUser ? "sent" : "requested") as
                  | "sent"
                  | "requested")
              : undefined,
          };
        })
        .sort((a, b) =>
          (a.friendRequestStatus || "").localeCompare(b.friendRequestStatus || ""),
        );

      setUsers(usersWithReqStatus);
    };

    fetchOtherUsers();
  }, [requests, currentUser]);

  return { users };
};
