export type User = {
  id: string;
  name?: string;
  email?: string;
  photoURL?: string;
};

export type FriendRequests = {
  id: string;
  from: string;
  to: string;
  status: "accepted" | "requested";
  createdAt?: any;
};
