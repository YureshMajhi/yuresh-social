import { useEffect, useState } from "react";
import { User } from "../lib/definitions";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export const getUserData = (userId: string) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) return;

    const docRef = doc(db, "users", userId);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          console.log("No such user found.");
          setUser(null);
        }
      },
      (error) => {
        console.error("Snapshot error:", error);
      },
    );

    return () => unsubscribe();
  }, [userId]);

  return { user };
};
