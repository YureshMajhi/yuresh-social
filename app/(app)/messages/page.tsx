import {
  InfoIcon,
  PaperclipIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  SendIcon,
  SquarePen,
  VideoIcon,
} from "lucide-react";

const Messages = () => {
  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto flex gap-6 p-4 md:p-6 min-h-0 overflow-hidden">
        <aside className="w-85 hidden lg:flex flex-col bg-white/60 backdrop-blur-2xl rounded-3xl shadow-sm border border-white/60 overflow-hidden shrink-0">
          <header className="bg-linear-to-br from-[#627e85] to-[#7b9499] text-white p-5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#f0714b] text-white flex items-center justify-center font-medium text-base shadow-sm">
                y
              </div>
              <span className="text-lg font-medium tracking-tight">Yuresh Social</span>
            </div>
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full border border-white/20 shadow-sm"></div>
          </header>

          <div className="p-4 pb-2 shrink-0">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full bg-white/80 border-none rounded-xl pl-10 pr-4 py-2.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 shadow-sm placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="px-5 py-3 flex justify-between items-center shrink-0">
            <h2 className="text-base font-medium text-gray-800">Messages</h2>
            <button className="text-[#f0714b] hover:text-[#e05b38] transition-colors p-1">
              <SquarePen className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/80 shadow-sm cursor-pointer border border-white/50">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Sophie"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Sophie
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">2:22 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">That sounds great!</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/40 cursor-pointer transition-colors border border-transparent">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Alex"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Alex
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">1:45 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Can you send the photo?</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/40 cursor-pointer transition-colors border border-transparent">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Jason"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Jason
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">12:10 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Let's meet up tomorrow</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/40 cursor-pointer transition-colors border border-transparent">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Emily"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Emily
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">9:23 AM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">How are you today?</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/40 cursor-pointer transition-colors border border-transparent">
              <img
                src="https://i.pravatar.cc/150?img=35"
                alt="Sarah"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Sarah
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">9:15 AM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">Let's catch up soon!</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/40 cursor-pointer transition-colors border border-transparent">
              <img
                src="https://i.pravatar.cc/150?img=60"
                alt="Michael"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="text-base font-medium text-gray-900 truncate">
                    Michael
                  </span>
                  <span className="text-xs text-gray-400 shrink-0">9:15 AM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  I sent the file you needed
                </p>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex-1 flex flex-col bg-white/60 backdrop-blur-2xl rounded-3xl shadow-sm border border-white/60 overflow-hidden relative">
          <header className="px-6 py-4 flex items-center justify-between border-b border-white/40 bg-white/20 shrink-0 z-10">
            <div className="flex items-center gap-4">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Sophie"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-sm"
              />
              <div>
                <h2 className="text-xl tracking-tight font-medium text-gray-900">
                  Sophie
                </h2>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
                <SearchIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
                <PhoneIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
                <VideoIcon className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-orange-100/50 text-[#f0714b] flex items-center justify-center hover:bg-orange-100 transition-colors">
                <InfoIcon className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 z-10">
            <div className="flex items-end gap-3 max-w-[80%]">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Sophie"
                className="w-10 h-10 rounded-full object-cover shrink-0 mb-5"
              />
              <div className="flex flex-col gap-1 items-start">
                <div className="bg-[#f0714b] text-white px-5 py-3 rounded-2xl rounded-bl-sm shadow-sm text-base">
                  Hey there!
                </div>
                <span className="text-xs text-gray-400 ml-1">2:02 PM</span>
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Me"
                className="w-10 h-10 rounded-full object-cover shrink-0 mb-5"
              />
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-[#829ca9] text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm text-base">
                  Hi Sophie!
                </div>
                <span className="text-xs text-gray-400 mr-1">2:02 PM</span>
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Me"
                className="w-10 h-10 rounded-full object-cover shrink-0 mb-5 opacity-0"
              />
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-[#829ca9] text-white px-5 py-3 rounded-2xl rounded-tr-sm rounded-br-sm shadow-sm text-base">
                  Are you free to hang out later?
                </div>
                <span className="text-xs text-gray-400 mr-1">2:20 PM</span>
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[80%]">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Sophie"
                className="w-10 h-10 rounded-full object-cover shrink-0 mb-5"
              />
              <div className="flex flex-col gap-1 items-start">
                <div className="bg-[#f0714b] text-white px-5 py-3 rounded-2xl rounded-bl-sm shadow-sm text-base">
                  Hi Sophie!
                </div>
                <span className="text-xs text-gray-400 ml-1">2:16 PM</span>
              </div>
            </div>

            <div className="flex items-end gap-3 max-w-[80%] self-end flex-row-reverse">
              <img
                src="https://i.pravatar.cc/150?img=11"
                alt="Me"
                className="w-10 h-10 rounded-full object-cover shrink-0 mb-5"
              />
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-[#829ca9] text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-sm text-base">
                  Absolutely, that sounds great!
                </div>
                <span className="text-xs text-gray-400 mr-1">2:12 PM</span>
              </div>
            </div>
          </div>

          <footer className="p-4 px-6 bg-white/30 border-t border-white/40 shrink-0 flex items-center gap-4 z-10">
            <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
              <PlusIcon className="w-6 h-6" />
            </button>

            <div className="flex-1 relative flex items-center">
              <i
                data-lucide="smile"
                className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none"
              ></i>
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-white/80 border border-white/60 shadow-sm rounded-full pl-12 pr-12 py-3.5 text-base outline-none focus:ring-2 focus:ring-[#f0714b]/20 transition-all placeholder:text-gray-400"
              />
              <button className="absolute right-4 text-gray-400 hover:text-gray-600 transition-colors">
                <PaperclipIcon className="w-5 h-5" />
              </button>
            </div>

            <button className="w-12 h-12 rounded-full bg-[#f0714b] hover:bg-[#e05b38] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 shrink-0 pl-1">
              <SendIcon className="w-5 h-5" />
            </button>
          </footer>
        </section>
      </main>
    </>
  );
};

export default Messages;
