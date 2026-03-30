"use client";

import { HomeIcon, LogOutIcon, MessageCircleMore, Users } from "lucide-react";
import { signout } from "@/lib/actions/firebaseAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserData } from "../hooks/getUserData";
import { auth } from "@/firebase";

const NavIcons = () => {
  const currentUser = auth.currentUser;
  const pathname = usePathname();

  const selectedPage = (path: string) => {
    return pathname === path ? "text-[#f0714b]" : "";
  };

  const { user } = getUserData(currentUser?.uid || "");

  return (
    <>
      <div className={`flex items-center gap-6 sm:gap-8 text-sm`}>
        <Link
          href={"/"}
          className={`flex flex-col items-center gap-1 ${selectedPage("/")}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>
        <Link
          href={"/messages"}
          className={`flex flex-col items-center gap-1 ${selectedPage("/messages")}`}
        >
          <MessageCircleMore className="w-6 h-6" />
          <span className="text-xs font-medium">Messages</span>
        </Link>

        <Link
          href={"/friends"}
          className={`flex flex-col items-center gap-1 ${selectedPage("/friends")}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs font-medium">Friends</span>
        </Link>

        <Link
          href={"/profile"}
          className={`flex flex-col items-center gap-1 group ${selectedPage("/profile")}`}
        >
          <img
            src={user?.photoURL ? user.photoURL : "/no-image.png"}
            alt="Profile"
            className="w-6 h-6 rounded-full border border-gray-200 object-cover"
          />
          <span className="text-xs font-medium ">Profile</span>
        </Link>

        <button
          className="flex flex-col items-center gap-1 group cursor-pointer"
          onClick={signout}
        >
          <LogOutIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" />
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
            Logout
          </span>
        </button>
      </div>
    </>
  );
};

export default NavIcons;
