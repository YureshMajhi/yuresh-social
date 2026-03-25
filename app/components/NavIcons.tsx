"use client";

import { HomeIcon, LogOutIcon, MessageCircleMore, Users } from "lucide-react";
import { signout } from "@/lib/actions/firebaseAuth";

const NavIcons = () => {
  return (
    <>
      <div className="flex items-center gap-6 sm:gap-8 text-sm">
        <button className="flex flex-col items-center gap-1 group">
          <HomeIcon className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" />
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
            Home
          </span>
        </button>
        <button className="flex flex-col items-center gap-1 text-[#f0714b]">
          <MessageCircleMore className="w-6 h-6" />
          <span className="text-xs font-medium">Messages</span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <Users className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" />
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
            Friends
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group">
          <img
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="Profile"
            className="w-6 h-6 rounded-full border border-gray-200"
          />
          <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
            Profile
          </span>
        </button>

        <button className="flex flex-col items-center gap-1 group" onClick={signout}>
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
