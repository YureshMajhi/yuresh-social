import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  name?: string;
  email?: string;
  photoURL?: string;
  friendRequestStatus?: "accepted" | "requested" | "sent" | "done" | "none";
};

export type FriendRequestsType = {
  id: string;
  from: string;
  to: string;
  status: "accepted" | "requested";
  createdAt?: any;
};

export type Conversation = {
  id?: string;
  lastMessage?: string;
  lastTimeStamp?: Timestamp;
  users?: string[];
  createdAt?: Timestamp;
};

export type Chat = Conversation & {
  name: string;
  photoURL: string;
};

export type Message = {
  id?: string;
  conversationId?: string;
  createdAt?: Timestamp;
  message?: string;
  ownMessage?: boolean;
  imageUrl?: string;
};

type comment = {
  user: string;
  text: string;
};

export type Post = {
  id: string;
  from: string;
  caption?: string;
  imageUrl?: string;
  likes?: string[];
  comments?: comment[];
  createdAt: Timestamp;
};
