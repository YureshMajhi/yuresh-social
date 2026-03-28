"use client";

import { getUserByConversationId } from "@/app/lib/actions/firebaseAuth";
import { Message, User } from "@/app/lib/definitions";
import { auth, db } from "@/firebase";
import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const getMessagesData = () => {
  const params = useParams();
  const id = params.id || "";

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("User not authenticated.");
  }

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

    let isInitial = true;
    const messageQuery = query(
      collection(db, "messages"),
      where("conversationId", "==", id.toString()),
      orderBy("createdAt", "desc"),
      limit(25),
    );
    const unsubscribeMessage = onSnapshot(messageQuery, (snapshot) => {
      if (isInitial) {
        const initialMessages = snapshot.docs
          .map((d) => ({
            id: d.id,
            ownMessage: d.data().from === currentUser.uid,
            ...d.data(),
          }))
          .reverse();

        setMessages(initialMessages);
        isInitial = false;
        return;
      }

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newMessage = {
            id: change.doc.id,
            ownMessage: change.doc.data().from === currentUser.uid,
            ...change.doc.data(),
          };

          setMessages((prev) => [...prev, newMessage]);
        }
      });
    });

    return () => {
      unsubscribeMessage();
    };
  }, [id]);

  return { messages, otherUser };
};
