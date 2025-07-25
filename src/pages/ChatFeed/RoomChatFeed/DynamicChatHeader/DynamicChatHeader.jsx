import { Inbox, Info } from "lucide-react";

export const DynamicChatHeaderConnected = ({ roomId, roomName }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-5">
        <div className="">
          <Inbox size={35}></Inbox>
        </div>
        <div>
          <p className=" text-x">{roomName || "🧪 Chemistry Group"}</p>
          <p className="text-blue-500 text-xs ">22 Members . 12 Online</p>
        </div>
      </div>
      <div
      >
        <Info size={35}></Info>
      </div>
    </div>
  );
};

//   <div className="w-60 h-7   text-white text-xl ">
//     {roomName || "🧪 Chemistry Group"}
//   </div>
//   <Inbox></Inbox>
//   <div className="w-60 h-7 left-[102px] top-[64px] absolute justify-start text-blue-500 text-xs ">
//     22 Members . 12 Online
//   </div>
//   <div className="w-10 h-10 left-[956px] top-[29px] absolute" />
//  <Info></Info>

export const DynamicChatHeaderNotConnected = () => {
  return (
    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl px-6 py-5 shadow-lg backdrop-blur-sm w-full">
      <div className="text-center">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-amber-500 rounded-full p-2 mr-3">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Room Connection Required
          </h2>
        </div>

        <p className="text-gray-300 text-base md:text-lg leading-relaxed">
          To start chatting, please provide your
          <span className="inline-flex items-center bg-purple-500/20 text-purple-300 px-2 py-1 rounded-md font-semibold text-sm mx-1">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Room Name
          </span>
          and
          <span className="inline-flex items-center bg-blue-500/20 text-blue-300 px-2 py-1 rounded-md font-semibold text-sm mx-1">
            <svg
              className="w-4 h-4 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm-2 5V6a2 2 0 114 0v1H8z"
                clipRule="evenodd"
              />
            </svg>
            Room ID
          </span>
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span>Disconnected</span>
          </div>
          <span className="text-gray-600">•</span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                clipRule="evenodd"
              />
            </svg>
            <span>Waiting to connect</span>
          </div>
        </div>
      </div>
    </div>
  );
};
