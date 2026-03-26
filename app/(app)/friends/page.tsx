import PeopleYouMayKnow from "@/app/components/Friends/PeopleYouMayKnow";
import { SearchIcon } from "lucide-react";

const Friends = () => {
  return (
    <>
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 p-4 md:p-6 overflow-y-auto items-start pb-20">
        <div className="flex-1 w-full flex flex-col gap-8 bg-white/40 backdrop-blur-xl rounded-4xl p-6 lg:p-8 shadow-sm border border-white/60">
          <section className="flex flex-col gap-5">
            <h2 className="text-xl tracking-tight font-medium text-gray-800">
              Friend Requests
            </h2>

            <div className="flex flex-col gap-3">
              <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=11"
                    alt="Eric"
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Eric</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img
                        src="https://i.pravatar.cc/150?img=47"
                        alt="Mutual"
                        className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                      />
                      <span className="text-sm text-gray-500">22 mutual friends</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                    Accept
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                    Decline
                  </button>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=5"
                    alt="Hannah"
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Hannah</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img
                        src="https://i.pravatar.cc/150?img=32"
                        alt="Mutual"
                        className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                      />
                      <span className="text-sm text-gray-500">10 mutual friends</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                    Accept
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                    Decline
                  </button>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] p-4 flex items-center justify-between shadow-sm border border-white/50">
                <div className="flex items-center gap-4">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="Ryan"
                    className="w-14 h-14 rounded-full object-cover shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900">Ryan</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img
                        src="https://i.pravatar.cc/150?img=60"
                        alt="Mutual"
                        className="w-5 h-5 rounded-full object-cover border border-white shadow-sm"
                      />
                      <span className="text-sm text-gray-500">8 mutual friends</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm">
                    Accept
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors border border-gray-200/60">
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </section>

          <PeopleYouMayKnow />
        </div>

        <aside className="w-full lg:w-95 shrink-0 flex flex-col gap-6 bg-white/40 backdrop-blur-xl rounded-4xl p-6 lg:p-8 shadow-sm border border-white/60">
          <h2 className="text-xl tracking-tight font-medium text-gray-800">
            Find Friends
          </h2>

          <div className="relative mt-1">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search people"
              className="w-full bg-white/70 border border-white/60 rounded-2xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#f09b59]/30 transition-all placeholder:text-gray-400 shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-5 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=13"
                  alt="Ethan"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Ethan</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=5"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">18 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=20"
                  alt="Olivia"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Olivia</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=9"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">15 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=15"
                  alt="Daniel"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Daniel</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">12 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=24"
                  alt="Natalie"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Natalie</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=32"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">10 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=26"
                  alt="Emma"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Emma</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=47"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">8 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/150?img=33"
                  alt="Jack"
                  className="w-12 h-12 rounded-full object-cover shadow-sm border border-white/50"
                />
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900">Jack</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      alt="Mutual"
                      className="w-4 h-4 rounded-full object-cover border border-white shadow-sm"
                    />
                    <span className="text-sm text-gray-500">5 mutual friends</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#f09b59] hover:bg-[#e68a44] text-white px-4 py-2 rounded-[0.85rem] text-sm font-medium transition-colors shadow-sm">
                Add Friend
              </button>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
};

export default Friends;
