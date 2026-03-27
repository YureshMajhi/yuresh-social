"use client";

import { useFriendRequestData } from "@/app/hooks/useFriendRequestData";
import { acceptFriendRequest } from "@/app/lib/actions/firebaseAuth";
import { FriendRequestsType, User } from "@/app/lib/definitions";

const FriendRequests = ({
  requests,
  currentUser,
}: {
  requests: FriendRequestsType[];
  currentUser: string;
}) => {
  const { users } = useFriendRequestData({ requests, currentUser });

  if (users.length === 0) return;

  return (
    <>
      <section className="flex flex-col gap-5">
        <h2 className="text-xl tracking-tight font-medium text-gray-800">
          Friend Requests
        </h2>

        {users.map((user) => (
          <div key={user.id} className="flex flex-col gap-3">
            <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Eric"
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">{user.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Mutual"
                      className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">6 mutual friends</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {user?.friendRequestStatus === "requested" ? (
                  <>
                    <button
                      onClick={() => {
                        if (user?.id) acceptFriendRequest(user.id);
                      }}
                      className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
                    >
                      Accept
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                      Decline
                    </button>
                  </>
                ) : (
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                    Sent
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default FriendRequests;
