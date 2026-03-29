"use client";

import {
  HeartIcon,
  MessageCircle,
  MoreVerticalIcon,
  SendIcon,
  UploadIcon,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "@/firebase";
import {
  createPost,
  updatePostComment,
  updatePostLike,
} from "../lib/actions/firebaseAuth";
import Spinner from "../components/Spinner";
import { usePostsData } from "../hooks/usePostsData";

export default function Home() {
  const currentUser = auth.currentUser;

  const { posts } = usePostsData();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadPost, setUploadPost] = useState({
    text: "",
    imageUrl: "",
    onProgress: false,
  });
  const [commentsTexts, setCommentTexts] = useState<Record<string, string>>({});

  const uploadClick = () => {
    if (!fileInputRef.current) {
      console.log("no upload method found.");
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("File is too large! Please selec an image smaller than 3MB.");
      e.target.value = "";
      return;
    }

    const storageRef = ref(storage, `postImages/${file.name}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      if (downloadUrl) setUploadPost((prev) => ({ ...prev, imageUrl: downloadUrl }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async () => {
    if (!uploadPost.imageUrl) return;

    const imageRef = ref(storage, uploadPost.imageUrl);

    try {
      await deleteObject(imageRef);

      setUploadPost((prev) => ({ ...prev, imageUrl: "" }));

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error deleting image from storage:", error);
      alert("Failed to delete image. Please try again.");
    }
  };

  const handleAddPost = async () => {
    if (!uploadPost.imageUrl) {
      if (!uploadPost.text) return;
    }
    setUploadPost((prev) => ({ ...prev, onProgress: true }));
    await createPost(uploadPost.text, uploadPost.imageUrl);

    setUploadPost({ text: "", imageUrl: "", onProgress: false });
  };

  const handleAddComments = async (postId: string) => {
    const text = commentsTexts[postId];
    if (!text?.trim()) return;

    try {
      await updatePostComment(postId, text);

      setCommentTexts((prev) => ({
        ...prev,
        [postId]: "",
      }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <>
      <main className="flex-1 w-full max-w-2xl mx-auto flex flex-col gap-6 p-4 md:p-6 overflow-y-auto items-center pb-20">
        <div className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-3 shadow-sm border border-white/60 gap-3 flex flex-col">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover ml-1"
            />

            <div className="flex-1 flex items-center bg-gray-50/80 border border-gray-100 rounded-full pl-5 pr-2 py-1.5 transition-colors focus-within:bg-white focus-within:border-gray-200">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full bg-transparent outline-none text-base placeholder:text-gray-400"
                value={uploadPost.text}
                onChange={(e) =>
                  setUploadPost((prev) => ({ ...prev, text: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPost();
                  }
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
              <button
                className={`text-[#f6895b] text-base font-medium px-4 shrink-0 transition-colors hover:text-[#e47648] cursor-pointer ${uploadPost.imageUrl ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={!!uploadPost.imageUrl}
                onClick={uploadClick}
              >
                Photo
              </button>
            </div>

            <button
              className={`bg-[#f6895b] hover:bg-[#e47648] text-white px-7 py-2.5 rounded-xl text-base font-medium transition-colors shadow-sm shrink-0 cursor-pointer ${uploadPost.onProgress ? "opacity-70 cursor-not-allowed" : ""}`}
              onClick={handleAddPost}
              disabled={!!uploadPost.onProgress}
            >
              {uploadPost.onProgress ? <Spinner /> : "Post"}
            </button>
          </div>
          {uploadPost.imageUrl && (
            <div className="ml-16 relative inline-block max-w-fit">
              <img
                src={`${uploadPost.imageUrl}`}
                alt={`${uploadPost.imageUrl}`}
                className="h-18 object-cover shrink-0 mb-5 rounded-2xl"
              />
              <X
                className="w-5 h-5 cursor-pointer absolute -top-2 -right-4 text-[#f6895b]"
                strokeWidth={3}
                onClick={handleDeleteImage}
              />
            </div>
          )}
        </div>

        {posts.length > 0 &&
          posts.map((post) => (
            <div
              key={post.id}
              className="w-full bg-white/80 backdrop-blur-xl rounded-3xl p-5 flex flex-col gap-4 shadow-sm border border-white/60"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Sophie"
                    className="w-11 h-11 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Sophie</span>
                    <span className="text-sm text-gray-400">2h ago</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <button className="hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                    <UploadIcon className="w-5 h-5" />
                  </button>
                  <button className="hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                    <MoreVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {post.imageUrl && (
                <div className="w-full rounded-[1.25rem] overflow-hidden">
                  <img
                    src={`${post.imageUrl}`}
                    alt={`image`}
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              )}

              {post.caption && (
                <p className="text-base text-gray-800 px-1">{post.caption}</p>
              )}

              <div className="flex items-center gap-5 bg-gray-50/80 border border-gray-100/80 rounded-full px-5 py-3 text-base text-gray-500 w-full mt-1">
                <div className="flex items-center gap-2 cursor-pointer group">
                  <HeartIcon
                    className={`w-4.5 h-4.5 text-[#f6895b] ${post.likes?.includes(currentUser?.uid.toString() ?? "") && "fill-[#f6895b]"} group-hover:scale-110 transition-transform`}
                  />
                  <span
                    className="font-medium"
                    onClick={() => updatePostLike(post.id, post.likes ?? [])}
                  >
                    {post.likes ? post.likes.length : "0"} Likes
                  </span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer group">
                  <MessageCircle className="w-4.5 h-4.5 group-hover:text-gray-700 transition-colors" />
                  <span className="font-medium">
                    {post.comments ? post.comments.length : "0"} Comments
                  </span>
                </div>
              </div>
              {post.comments &&
                post.comments.map((comment) => (
                  <div
                    key={post.id + comment.text}
                    className="flex flex-col gap-4 px-2 mt-2"
                  >
                    <div className="flex gap-3 items-start w-full">
                      <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="David"
                        className="w-8 h-8 rounded-full object-cover shrink-0 mt-1"
                      />
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="bg-gray-50/80 border border-gray-100/80 rounded-[1.25rem] rounded-tl-sm px-4 py-2.5">
                          <span className="text-sm font-medium text-gray-900 mr-1">
                            David
                          </span>
                          <span className="text-sm text-gray-700">{comment.text}</span>
                        </div>
                        <div className="flex items-center gap-3 px-2 text-xs text-gray-500 font-medium">
                          <span className="text-gray-400 font-normal">1h ago</span>
                          <button className="hover:text-gray-900 transition-colors">
                            Like
                          </button>
                          <button className="hover:text-gray-900 transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="flex items-center gap-3 bg-gray-50/80 border border-gray-100/80 rounded-full p-1.5 w-full transition-colors focus-within:bg-white focus-within:border-gray-200">
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  alt="User"
                  className="w-9 h-9 rounded-full ml-1 object-cover"
                />
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-400 min-w-0 px-2"
                  value={commentsTexts[post.id] || ""}
                  onChange={(e) =>
                    setCommentTexts((prev) => ({
                      ...prev,
                      [post.id]: e.target.value, // Only update this specific post's text
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddComments(post.id);
                    }
                  }}
                />
                <button
                  onClick={() => {
                    handleAddComments(post.id);
                  }}
                  className="bg-[#f6895b] hover:bg-[#e47648] w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 transition-colors shadow-sm"
                >
                  <SendIcon className="w-4 h-4 -ml-0.5 mt-0.5" />
                </button>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}

