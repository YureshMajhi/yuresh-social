"use client";

import ConversationHeader from "@/app/components/Messages/ConversationHeader";
import TypeMessage from "@/app/components/Messages/TypeMessage";
import { getMessagesData } from "@/app/hooks/getMessagesData";
import { Timestamp } from "firebase/firestore";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { otherUser, messages } = getMessagesData();

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      <ConversationHeader otherUser={otherUser} />

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
        <div ref={bottomRef}></div>
      </div>

      <TypeMessage />
    </>
  );
};

export default Messages;
