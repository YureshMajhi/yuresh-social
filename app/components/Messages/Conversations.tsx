import { Conversation } from "@/app/lib/definitions";
import { SearchIcon, SquarePen } from "lucide-react";
import ConversationBox from "./ConversationBox";

const Conversations = ({ conversations }: { conversations: Conversation[] }) => {
  return (
    <>
      <aside className="w-85 hidden lg:flex flex-col bg-white/60 backdrop-blur-2xl rounded-3xl shadow-sm border border-white/60 overflow-hidden shrink-0">
        <header className="bg-linear-to-br from-[#627e85] to-[#7b9499] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f0714b] text-white flex items-center justify-center font-medium text-base shadow-sm">
              y
            </div>
            <span className="text-lg font-medium tracking-tight">Yuresh Social</span>
          </div>
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white/20 shadow-sm"></div>
        </header>

        <div className="p-4 pb-2 shrink-0">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full bg-white/80 border-none rounded-xl pl-10 pr-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 shadow-sm placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="px-5 py-3 flex justify-between items-center shrink-0">
          <h2 className="text-base font-medium text-gray-800">Messages</h2>
          <button className="text-[#f0714b] hover:text-[#e05b38] transition-colors p-1">
            <SquarePen className="w-5 h-5" />
          </button>
        </div>

        <ConversationBox conversations={conversations} />
      </aside>
    </>
  );
};

export default Conversations;
