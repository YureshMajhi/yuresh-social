import { Timestamp } from "firebase/firestore";

export type User = {
  id: string;
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
