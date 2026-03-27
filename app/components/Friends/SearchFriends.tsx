"use client";

import { searchUsersByName, sendFriendRequest } from "@/app/lib/actions/firebaseAuth";
import { User } from "@/app/lib/definitions";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchFriends = ({ unknownUsers }: { unknownUsers: User[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const query = params.get("query") || "";

  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleChange = useDebouncedCallback((text) => {
    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    const fetchUsers = async () => {
      const result = await searchUsersByName(query);
      setSearchResults(result);
    };

    fetchUsers();
  }, [query]);

  const users = searchResults.length > 0 ? searchResults : unknownUsers;

  return (
    <>
      <aside className="w-full lg:w-95 shrink-0 flex flex-col gap-6 bg-white/40 backdrop-blur-xl rounded-4xl p-6 lg:p-8 shadow-sm border border-white/60 min-h-full max-h-full">
        <h2 className="text-xl tracking-tight font-medium text-gray-800">Find Friends</h2>

        <div className="relative mt-1">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search people"
            className="w-full bg-white/70 border border-white/60 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f09b59]/30 transition-all placeholder:text-gray-400 shadow-sm"
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>

        {users.map((user, i) => (
          <div key={user.id + i} className="flex flex-col gap-5 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=13"
                  alt="Ethan"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">{user.name}</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">6 mutual friends</span>
                  </div>
                </div>
              </div>
              {user.friendRequestStatus !== "done" && (
                <button
                  onClick={() => sendFriendRequest(user.id)}
                  className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm"
                >
                  Add Friend
                </button>
              )}
            </div>
          </div>
        ))}
      </aside>
    </>
  );
};

export default SearchFriends;
