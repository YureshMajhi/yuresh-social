import { User } from "@/app/lib/definitions";
import { CalendarIcon, MapPinIcon, PencilIcon } from "lucide-react";

const Intro = ({
  setEditProfile,
  user,
}: {
  setEditProfile: (value: boolean) => void;
  user: User | null;
}) => {
  return (
    <>
      <div className="lg:col-span-4 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/60 flex flex-col h-full">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Intro</h3>

        <div className="flex flex-col gap-5 flex-1">
          <div className="group cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <span className="text-base font-medium text-gray-900">Bio</span>
              <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base text-gray-600 leading-relaxed">
              {user?.bio || "Update your bio."}
            </p>
          </div>

          <div className="w-full h-px bg-gray-100/80 my-1"></div>

          <div className="group cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3 text-base text-gray-600">
              <MapPinIcon className="w-5 h-5 text-[#f0714b]" />{" "}
              {user?.location || "Update your location."}
            </div>
            <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="group cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-3 text-base text-gray-600">
              <CalendarIcon className="w-5 h-5 text-gray-400" /> Joined January 2023
            </div>
            <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setEditProfile(true)}
          className="w-full mt-8 bg-linear-to-r from-[#f6895b] to-[#f0714b] hover:from-[#e47648] hover:to-[#df623c] text-white py-3 rounded-xl text-base font-medium transition-all shadow-sm flex items-center justify-center gap-2"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
};

export default Intro;
