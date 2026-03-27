"use client";

import { fetchUserConversations, getUserById } from "@/app/lib/actions/firebaseAuth";
import { Chat, Conversation, User } from "@/app/lib/definitions";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";

export const useChatsData = () => {
  const currentUser = auth.currentUser;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      const result = await fetchUserConversations();

      if (!result) {
        setConversations([]);
      }

      setConversations(result);
    };

    fetchConversations();
  }, []);

  useEffect(() => {
    if (conversations.length === 0) return;

    const fetchUsers = async () => {
      const conversationWithUserData = await Promise.all(
        conversations.map(async (conversation) => {
          if (!conversation.users) return null;

          const otherUserId = conversation.users.find((id) => id !== currentUser?.uid);

          if (!otherUserId) return null;

          const userData: User | null = await getUserById(otherUserId);

          if (!userData) return null;

          return {
            ...conversation,
            name: userData.name,
            photoURL: userData.photoURL,
          };
        }),
      );
      if (conversationWithUserData.length !== 0) {
        const filtered = conversationWithUserData.filter(
          (convo): convo is Chat => convo !== null,
        );
        setChats(filtered);
      }
    };

    fetchUsers();
  }, [conversations]);

  return { chats };
};
