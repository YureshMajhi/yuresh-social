"use client";

import { Conversation } from "@/app/lib/definitions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ConversationBox = ({ conversations }: { conversations: Conversation[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const query = params.get("query") || "";

  const handleClick = (convoId: string | undefined) => {
    if (convoId) {
      params.set("query", convoId);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        {conversations.length > 0 ? (
          conversations.map((convo) => (
            <div
              key={convo.id}
              onClick={() => handleClick(convo.id)}
              className={`flex items-center gap-4 p-3 rounded-2xl ${convo.id === query ? "bg-white/80 shadow-sm cursor-pointer border border-white/50" : "hover:bg-white/60 cursor-pointer transition-colors border border-transparent"}`}
            >
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Sophie"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Sophie
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">2:22 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {convo.lastMessage ? convo.lastMessage : "Start Conversation"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default ConversationBox;
