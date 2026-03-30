"use client";

import { User } from "@/app/lib/definitions";
import { CalendarIcon, CameraIcon, MapPinIcon, PencilIcon } from "lucide-react";

const ProfileMain = ({
  user,
  setEditProfile,
}: {
  user: User | null;
  setEditProfile: (value: boolean) => void;
}) => {
  const handleClickEdit = () => {
    setEditProfile(true);
  };

  console.log(user);
  return (
    <>
      <div className="flex flex-col items-center text-center w-full z-0 relative">
        <div className="relative inline-block mb-4">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-1 bg-white/40 backdrop-blur-sm shadow-sm">
            <img
              src={user?.photoURL ? user.photoURL : "/no-image.png"}
              alt={user?.updatedName || user?.name}
              className="w-full h-full rounded-full object-cover border-4 border-white shadow-inner"
            />
          </div>
          <button
            className="absolute bottom-2 right-2 bg-white p-2.5 rounded-full shadow-md border border-gray-100 text-gray-500 hover:text-gray-900 transition-colors hover:scale-105 transform"
            onClick={handleClickEdit}
          >
            <CameraIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-1">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            {user?.updatedName || user?.name}
          </h2>
          <button
            className="text-gray-400 hover:text-gray-700 transition-colors mt-1"
            onClick={handleClickEdit}
          >
            <PencilIcon className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <p className="text-base font-medium text-gray-500 mb-4">@{user?.username}</p>

        <p className="text-base md:text-lg text-gray-700 max-w-lg mb-4">{user?.bio}</p>

        <div className="flex items-center justify-center gap-6 text-base font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4.5 h-4.5 text-[#f0714b]" />
            {user?.location}
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4.5 h-4.5 text-gray-400" />
            January 2023
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
