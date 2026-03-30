"use client";

import { useEffect, useState } from "react";
import { Post, User } from "../lib/definitions";
import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { getUserById } from "../lib/actions/firebaseAuth";

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

      onSnapshot(postQuery, async (snapshot) => {
        if (isInitial) {
          const initialPosts = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as Post[];

          const postsWithUserData = await Promise.all(
            initialPosts.map(async (post) => {
              const userData = (await getUserById(post.from)) as any;
              return {
                ...post,
                photoURL: userData?.photoURL || "",
                username: userData?.updatedName || userData?.name,
              };
            }),
          );

          setPosts(postsWithUserData);
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

  useEffect(() => {
    if (posts.length === 0) return;

    const needsUpdate = posts.some((post) => post.comments?.some((c) => !c.userName));

    if (!needsUpdate) return;

    const updateComments = async () => {
      const updatedPosts = await Promise.all(
        posts.map(async (post) => {
          if (!post.comments) return post;

          const updatedComments = await Promise.all(
            post.comments.map(async (comment) => {
              if (comment.userName) return comment;

              const userData = (await getUserById(comment.user)) as User;

              return {
                ...comment,
                userName: userData?.updatedName || userData.name,
                photoURL: userData?.photoURL || "",
              };
            }),
          );

          return { ...post, comments: updatedComments };
        }),
      );

      setPosts(updatedPosts);
    };

    updateComments();
  }, [posts]);

  return { posts };
};
