"use client";

import { Chat } from "@/app/lib/definitions";
import Link from "next/link";
import { useParams } from "next/navigation";

const ConversationBox = ({ conversations }: { conversations: Chat[] }) => {
  const params = useParams();
  const id = params?.id;

  return (
    <>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {conversations.length > 0 ? (
          conversations.map((convo) => (
            <Link
              href={`/messages/${convo.id}`}
              key={convo.id}
              className={`flex items-center gap-4 p-3 rounded-2xl ${convo.id === id ? "bg-white/80 shadow-sm cursor-pointer border border-white/50" : "hover:bg-white/70 cursor-pointer transition-colors border border-transparent"}`}
            >
              <img
                src={convo?.photoURL || "/no-image.png"}
                alt="Sophie"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    {convo.name}
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">2:22 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {convo.lastMessage ? convo.lastMessage : "Start Conversation"}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default ConversationBox;
