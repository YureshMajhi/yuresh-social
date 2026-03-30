"use client";

import EditProfile from "@/app/components/Profile/EditProfile";
import Friends from "@/app/components/Profile/Friends";
import Intro from "@/app/components/Profile/Intro";
import Photos from "@/app/components/Profile/Photos";
import ProfileMain from "@/app/components/Profile/ProfileMain";
import { getUserData } from "@/app/hooks/getUserData";
import { auth } from "@/firebase";
import { useState } from "react";

const Profile = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user found.");
  }
  const [editProfile, setEditProfile] = useState<boolean>(false);

  const { user } = getUserData(currentUser.uid);
  return (
    <>
      <main className="flex-1 w-full max-w-280 mx-auto flex flex-col overflow-y-auto pt-6 md:pt-10 pb-20 px-4 md:px-6">
        <ProfileMain user={user} setEditProfile={setEditProfile} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-10">
          <Intro setEditProfile={setEditProfile} user={user} />
          <Photos />
          <Friends />
        </div>
      </main>

      {editProfile && <EditProfile setOpen={setEditProfile} user={user} />}
    </>
  );
};

export default Profile;
