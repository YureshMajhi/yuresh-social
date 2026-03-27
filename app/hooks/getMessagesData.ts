"use client";

import { fetchMessages, getUserByConversationId } from "@/app/lib/actions/firebaseAuth";
import { Message, User } from "@/app/lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const getMessagesData = () => {
  const params = useParams();
  const id = params.id || "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>({});

  useEffect(() => {
    if (!id) return;
    const getOtherUserData = async () => {
      const result = await getUserByConversationId(id.toString());

      setOtherUser(result);
    };

    getOtherUserData();
  }, []);

  useEffect(() => {
    if (!id) {
      return;
    }
    const getMessages = async () => {
      const result = await fetchMessages(id.toString());
      setMessages(result);
    };

    getMessages();
  }, [id]);

  return { messages, otherUser };
};
