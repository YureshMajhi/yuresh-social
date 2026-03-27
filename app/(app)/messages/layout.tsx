"use client";

import Conversations from "@/app/components/Messages/Conversations";
import { useChatsData } from "@/app/hooks/useChatsData";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { chats } = useChatsData();

  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto flex gap-6 p-4 md:p-6 min-h-0 overflow-hidden">
        <Conversations conversations={chats} />

        <section className="flex-1 flex flex-col bg-white/60 backdrop-blur-2xl rounded-3xl shadow-sm border border-white/60 overflow-hidden relative">
          {children}
        </section>
      </main>
    </>
  );
};

export default Layout;
