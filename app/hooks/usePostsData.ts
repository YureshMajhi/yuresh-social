"use client";

import { useEffect, useState } from "react";
import { Post } from "../lib/definitions";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

export const usePostsData = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    let isInitial = true;

    const getLatestPost = async () => {
      const postQuery = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(8),
      );

      onSnapshot(postQuery, (snapshot) => {
        if (isInitial) {
          const initialPosts = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Post[];

          setPosts(initialPosts);
          isInitial = false;
          return;
        }

        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const post = {
              id: change.doc.id,
              ...change.doc.data(),
            } as Post;

            setPosts((prev) => {
              const exists = prev.find((p) => p.id === post.id);
              if (exists) return prev;
              return [post, ...prev];
            });
          }
        });

        snapshot.docChanges().forEach((change) => {
          if (change.type === "modified") {
            const post = {
              id: change.doc.id,
              ...change.doc.data(),
            } as Post;

            setPosts((prev) =>
              prev.map((prev) => {
                if (prev.id === post.id) {
                  return post;
                }
                return prev;
              }),
            );
          }
        });
      });
    };

    getLatestPost();
  }, []);

  return { posts };
};
