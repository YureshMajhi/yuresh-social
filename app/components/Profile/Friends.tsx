import { ChevronRightIcon } from "lucide-react";
import React from "react";

const Friends = () => {
  return (
    <>
      <div className="lg:col-span-4 bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm border border-white/60 h-full flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-medium text-gray-900">Friends</h3>
          <button className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1">
            All Friends (134) <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-y-5 gap-x-3 flex-1">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=47"
              alt="Sophie"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Sophie</span>
              <span className="text-xs text-gray-500 truncate">8 mutual friends</span>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Alex"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Alex</span>
              <span className="text-xs text-gray-500 truncate">12 mutual friends</span>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Hannah"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Hannah</span>
              <span className="text-xs text-gray-500 truncate">10 mutual friends</span>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Jason"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Jason</span>
              <span className="text-xs text-gray-500 truncate">9 mutual friends</span>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=9"
              alt="Emily"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Emily</span>
              <span className="text-xs text-gray-500 truncate">6 mutual friends</span>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer group">
            <img
              src="https://i.pravatar.cc/150?img=41"
              alt="Sarah"
              className="w-11 h-11 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-base font-medium text-gray-900 truncate">Sarah</span>
              <span className="text-xs text-gray-500 truncate">5 mutual friends</span>
            </div>
          </div>
        </div>

        <button className="w-full mt-6 bg-gray-50/80 hover:bg-gray-100/80 text-gray-600 py-3 rounded-xl text-sm font-medium transition-colors border border-gray-100/80 flex items-center justify-center gap-1">
          All Friends (134)
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default Friends;
