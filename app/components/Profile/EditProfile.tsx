"use client";

import { updateUser } from "@/app/lib/actions/firebaseAuth";
import { UpdatedUserDetails, User } from "@/app/lib/definitions";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CameraIcon, MapPinIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const EditProfile = ({
  setOpen,
  user,
}: {
  setOpen: (value: boolean) => void;
  user: User | null;
}) => {
  const onClose = () => {
    setUserDetails({
      updatedName: "",
      username: "",
      bio: "",
      location: "",
      photoURL: "",
    });
    setOpen(false);
  };

  const [userDetails, setUserDetails] = useState<UpdatedUserDetails>({
    updatedName: "",
    username: "",
    bio: "",
    location: "",
    photoURL: "",
  });

  useEffect(() => {
    if (!user) return;

    setUserDetails({
      updatedName: user.updatedName || user.name,
      username: user.username || "",
      bio: user.bio || "",
      location: user.location || "",
      photoURL: user.photoURL || "",
    });
  }, [user]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadClick = () => {
    if (!fileInputRef.current) {
      console.log("no upload method found.");
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("File is too large! Please selec an image smaller than 3MB.");
      e.target.value = "";
      return;
    }

    const storageRef = ref(storage, `profileImages/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      if (downloadUrl) setUserDetails((prev) => ({ ...prev, photoURL: downloadUrl }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div id="profileModal">
        <div
          className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
          onClick={onClose}
        ></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-4 flex items-center justify-center pointer-events-none">
          <div
            className="bg-white/95 backdrop-blur-2xl rounded-4xl shadow-2xl border border-white overflow-hidden transform scale-95 transition-transform duration-300 w-full pointer-events-auto flex flex-col max-h-[90vh]"
            id="modalContent"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100/80 shrink-0">
              <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                Edit Profile
              </h2>
              <button
                onClick={onClose}
                className="p-2 -mr-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex justify-center mb-2">
                <div className="relative group cursor-pointer">
                  <img
                    src={userDetails.photoURL ? userDetails.photoURL : "/no-image.png"}
                    alt="Avatar"
                    className="w-24 h-24 rounded-full object-cover border border-gray-200"
                  />
                  <div
                    className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={uploadClick}
                  >
                    <CameraIcon className="w-6 h-6 text-white" />
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Name</label>
                <input
                  type="text"
                  value={userDetails?.updatedName}
                  onChange={(e) => {
                    setUserDetails((prev) => ({ ...prev, updatedName: e.target.value }));
                  }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 focus:border-[#f0714b] transition-all shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    @
                  </span>
                  <input
                    type="text"
                    value={userDetails.username}
                    onChange={(e) => {
                      setUserDetails((prev) => ({ ...prev, username: e.target.value }));
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 focus:border-[#f0714b] transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Bio</label>
                <textarea
                  rows={3}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 focus:border-[#f0714b] transition-all shadow-sm resize-none"
                  value={userDetails.bio}
                  onChange={(e) => {
                    setUserDetails((prev) => ({ ...prev, bio: e.target.value }));
                  }}
                ></textarea>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 ml-1">Location</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={userDetails.location}
                    onChange={(e) => {
                      setUserDetails((prev) => ({ ...prev, location: e.target.value }));
                    }}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 focus:border-[#f0714b] transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50/50 flex items-center justify-end gap-3 border-t border-gray-100/80 shrink-0">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateUser(userDetails);
                  onClose();
                }}
                className="px-6 py-2.5 rounded-xl text-base font-medium text-white bg-[#f0714b] hover:bg-[#e47648] transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
