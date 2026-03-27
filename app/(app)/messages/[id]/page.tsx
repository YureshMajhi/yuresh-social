"use client";

import TypeMessage from "@/app/components/Messages/TypeMessage";
import { getMessagesData } from "@/app/hooks/getMessagesData";
import { Timestamp } from "firebase/firestore";
import { InfoIcon, PhoneIcon, SearchIcon, VideoIcon } from "lucide-react";

const Messages = () => {
  const { otherUser, messages } = getMessagesData();

  const formatTimeStamp = (firebaseTimeStamp?: Timestamp) => {
    if (!firebaseTimeStamp) return "";
    const date = firebaseTimeStamp.toDate();

    const formatted = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formatted;
  };

  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/40 bg-white/20 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150?img=47"
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

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 z-10">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-end gap-3 max-w-[80%] ${message.ownMessage && "self-end flex-row-reverse"}`}
          >
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Me"
              className="w-10 h-10 rounded-full object-cover shrink-0 mb-5"
            />
            <div className="flex flex-col gap-1 items-end">
              <div
                className={`${message.ownMessage ? "bg-[#829ca9]" : "bg-[#f0714b]"} text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm text-base`}
              >
                {message.message}
              </div>
              <span className="text-xs text-gray-400 mr-1">
                {formatTimeStamp(message.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <TypeMessage />
    </>
  );
};

export default Messages;
