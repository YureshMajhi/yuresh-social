"use client";

import { sendMessage } from "@/app/lib/actions/firebaseAuth";
import { PaperclipIcon, PlusIcon, SendIcon, SmileIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

const TypeMessage = () => {
  const params = useParams();
  const id = params?.id || "";

  const [message, setMessage] = useState<string>("");

  const handleSendMessage = () => {
    sendMessage(id.toString(), message);
    setMessage("");
  };

  return (
    <>
      <div className="p-4 px-6 bg-white/30 border-t border-white/40 shrink-0 flex items-center gap-4 z-10">
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
          <PlusIcon className="w-6 h-6" />
        </button>

        <div className="flex-1 relative flex items-center">
          <SmileIcon className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-white/80 border border-white/60 shadow-sm rounded-full pl-12 pr-12 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 transition-all placeholder:text-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <PaperclipIcon className="w-5 h-5" />
          </button>
        </div>

        <button className="w-12 h-12 rounded-full bg-[#f0714b] hover:bg-[#e05b38] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0 pl-1">
          <SendIcon className="w-5 h-5" onClick={handleSendMessage} />
        </button>
      </div>
    </>
  );
};

export default TypeMessage;
