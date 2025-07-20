import { useEffect, useState, useRef } from "react";
import { Forward } from "lucide-react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useRoomMessage from "../../../hooks/useRoomMessage";

const RoomChatFeed = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = localStorage.getItem("username");
  const { roomName } = location.state || {};
  const [currentMessage, setCurrentMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  // Use React Query hook to fetch messages
  const { isPending, messages = [], isError } = useRoomMessage(roomId);

  // Local state to track messages (combines initial data + socket updates)
  const [chatMessages, setChatMessages] = useState([]);

  // Update local messages when React Query data changes
  useEffect(() => {
    if (messages && !isPending) {
      setChatMessages(messages);
    }
  }, [messages, isPending]);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Socket connection setup
  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000/");
    setSocket(newSocket);

    if (roomId) {
      newSocket.emit("join_room", roomId);
    }

    newSocket.on("receive_room_message", (data) => {
      // Update local state immediately for UI
      setChatMessages((prevMessages) => [...prevMessages, data]);

      // Invalidate the query to refetch messages on next render
      // This ensures sync between server and local state
      queryClient.invalidateQueries({ queryKey: ["messages", roomId] });
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, queryClient]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (currentMessage.trim() !== "" && socket && roomId) {
      const groupMessageData = {
        roomId: roomId,
        room: roomName || "Unknown Room",
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours().toString().padStart(2, "0") +
          ":" +
          new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
      };

      await socket.emit("send_room_message", groupMessageData);
      setCurrentMessage("");
    }
  };

  return (
    <div className="custom-bg flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 flex-none border-b border-gray-600 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          {roomId ? (
            // Connected to room state
            <div className="flex flex-col items-center space-y-3">
              {/* Main Room Info Card */}
              <div className="bg-gradient-to-r from-[#9269FD] to-purple-600 rounded-xl px-6 py-4 shadow-lg transform hover:scale-105 transition-transform duration-200 max-w-2xl w-full">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-sm font-medium text-white/90 uppercase tracking-wide">
                      Connected
                    </span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {roomName || "Unknown Room"}
                  </h1>
                  <div className="flex items-center justify-center space-x-2 text-white/80">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-4 1 1-4 .257-.257A6 6 0 1118 8zm-2-4a2 2 0 11-4 0 2 2 0 014 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-mono">ID: {roomId}</span>
                  </div>
                </div>
              </div>

              {/* Additional Room Stats */}
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-gray-300 flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                  <span>Active Chat</span>
                </div>
                <div className="bg-gray-700/50 backdrop-blur-sm rounded-lg px-3 py-1.5 text-gray-300 flex items-center space-x-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Real-time</span>
                </div>
              </div>
            </div>
          ) : (
            // Not connected state
            <div className="flex flex-col items-center space-y-4 max-w-3xl mx-auto">
              {/* Warning Card */}
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
                    To start chatting, please provide your{" "}
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
                    and{" "}
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
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
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
            </div>
          )}
        </div>
      </div>

      {/* Chat Feed - Fixed height with overflow */}
      <div
        className="flex-grow p-4 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 180px)" }}
      >
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <div className="flex items-center justify-center ">
              <div className="text-center">
                {/* Lottie Animation */}
                {/* Alternatively, use an image */}
                <img
                  className="mx-auto"
                  src="https://i.imgur.com/wAdNa6U.gif"
                  alt="Hamster animation"
                />
                <h1 className="text-4xl text-white  font-bold mt-4">
                  {`Kon'nichiwa!`}
                </h1>
                <p className="text-base mt-4 chat-text font-semibold">
                  No chat availabe
                </p>
                <h1 className="text-xl chat-text text-white font-bold ">
                  Please join a room to start conversation
                </h1>
              </div>
            </div>{" "}
          </div>
        ) : isError ? (
          <div className="text-center p-4 bg-red-100 text-red-800 rounded-md">
            Failed to load messages. Please try again.
          </div>
        ) : (
          <div className="space-y-4">
            {chatMessages.length === 0 && roomId ? (
              <div className="text-center p-4 text-gray-500">
                No messages yet. Be the first to send one!
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat ${
                    msg.author === username ? "chat-end" : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      msg.author === username
                        ? "bg-[#9269FD] text-white"
                        : "bg-gray-700 text-white"
                    } max-w-[75%] break-words`}
                  >
                    <p className="font-semibold">
                      {msg.author === username ? "You" : msg.author}
                      <span className="text-xs text-gray-300 ml-2">
                        ({msg.time})
                      </span>
                    </p>
                    <p className="mt-1">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Section - Fixed at bottom */}
      <div className="flex-none w-full p-4 bg-gray-800">
        <form onSubmit={handleOnSubmit} className="flex items-center">
          {roomId ? (
            <input
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
              disabled={!roomId || isPending}
              type="text"
              placeholder={isPending ? "Connecting..." : "Write a message..."}
              value={currentMessage}
              onChange={(event) => setCurrentMessage(event.target.value)}
            />
          ) : (
            <div className="flex-grow mx-auto p-3 rounded-md text-center bg-gray-900 text-white">
              Please join room to continue!
            </div>
          )}

          <button
            type="submit"
            disabled={!roomId || currentMessage.trim() === "" || isPending}
            className="ml-3 bg-[#9269FD] p-3 rounded-md text-white flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7d4de7] transition-colors"
          >
            Send <Forward size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RoomChatFeed;
