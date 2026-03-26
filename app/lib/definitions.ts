export type User = {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
  friendRequestStatus?: "accepted" | "requested" | "sent";
};

export type FriendRequestsType = {
  id: string;
  from: string;
  to: string;
  status: "accepted" | "requested";
  createdAt?: any;
};
