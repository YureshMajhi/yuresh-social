"use client";

import FriendRequests from "@/app/components/Friends/FriendRequests";
import PeopleYouMayKnow from "@/app/components/Friends/PeopleYouMayKnow";
import SearchFriends from "@/app/components/Friends/SearchFriends";
import { useFriendData } from "@/app/hooks/useFriendData";
import { FriendRequestsType, User } from "@/app/lib/definitions";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const Friends = () => {
  const { requests, currentUser, unknownUsers } = useFriendData();

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
