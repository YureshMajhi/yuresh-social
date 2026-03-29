"use client";

import { sendMessage } from "@/app/lib/actions/firebaseAuth";
import { storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PaperclipIcon, PlusIcon, SendIcon, SmileIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

const TypeMessage = () => {
  const params = useParams();
  const id = params?.id || "";

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (imageUrl: string = "") => {
    sendMessage(id.toString(), message, imageUrl);
    setMessage("");
  };

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

    setUploading(true);
    const storageRef = ref(storage, `images/${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      handleSendMessage(downloadUrl);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        onChange={handleFileChange}
        type="file"
        className="hidden"
        accept="image/*"
      />
      <div className="p-4 px-6 bg-white/30 border-t border-white/40 shrink-0 flex items-center gap-4 z-10">
        <button
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer"
          onClick={uploadClick}
        >
          <PlusIcon className="w-6 h-6" />
        </button>

        <div className="flex-1 relative flex items-center">
          <SmileIcon className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-white/80 border border-white/60 shadow-sm rounded-full pl-12 pr-12 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 transition-all placeholder:text-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <PaperclipIcon className="w-5 h-5" onClick={uploadClick} />
          </button>
        </div>

        <button className="w-12 h-12 rounded-full bg-[#f0714b] hover:bg-[#e05b38] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0 pl-1">
          <SendIcon className="w-5 h-5" onClick={() => handleSendMessage()} />
        </button>
      </div>
    </>
  );
};

export default TypeMessage;
