import { User } from "@/app/lib/definitions";
import { InfoIcon, PhoneIcon, SearchIcon, VideoIcon } from "lucide-react";

const ConversationHeader = ({ otherUser }: { otherUser: User | null }) => {
  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/40 bg-white/20 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <img
            src={otherUser?.photoURL || "/no-image.png"}
            alt="Sophie"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
          />
          <div>
            <h2 className="text-xl tracking-tight font-medium text-gray-900">
              {otherUser?.name}
            </h2>
            <span className="text-xs text-gray-500">Just now</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
            <PhoneIcon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
            <VideoIcon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
            <InfoIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
};

export default ConversationHeader;
