// src/pages/Room/Room.jsx - Fully Responsive Version
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { LogOut, Copy, ArrowRight, Users, Plus } from "lucide-react";

const socket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`);

const Room = () => {
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [currentRoom, setCurrentRoom] = useState(null);
  const [recentRooms, setRecentRooms] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  // Check for active room in localStorage on component mount
  useEffect(() => {
    const savedRoom = localStorage.getItem("currentRoom");
    const savedRoomName = localStorage.getItem("currentRoomName");

    if (savedRoom && savedRoomName) {
      setCurrentRoom({
        id: savedRoom,
        name: savedRoomName,
      });

      // Join the room automatically
      socket.emit("join_room", savedRoom, username);

      // Listen for online users updates
      socket.on("room_users_update", (users) => {
        setOnlineUsers(users);
      });
    }

    // Load recent rooms from localStorage
    const savedRecentRooms = localStorage.getItem("recentRooms");
    if (savedRecentRooms) {
      try {
        setRecentRooms(JSON.parse(savedRecentRooms));
      } catch (e) {
        console.error("Failed to parse recent rooms", e);
      }
    }
  }, [username]);

  // Save room to recent rooms list
  const addToRecentRooms = (roomData) => {
    const updatedRooms = [
      roomData,
      ...recentRooms.filter((room) => room.id !== roomData.id),
    ].slice(0, 1);

    setRecentRooms(updatedRooms);
    localStorage.setItem("recentRooms", JSON.stringify(updatedRooms));
  };

  // Generate a random room ID
  const generateRoomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const joinTheRoom = () => {
    if (roomName.trim() !== "" && roomId.trim() !== "") {
      localStorage.setItem("currentRoom", roomId);
      localStorage.setItem("currentRoomName", roomName);

      socket.emit("join_room", roomId, username);

      setCurrentRoom({
        id: roomId,
        name: roomName,
      });

      addToRecentRooms({
        id: roomId,
        name: roomName,
      });

      navigate(`/room/${roomId}`, {
        state: {
          roomName,
        },
      });

      toast.success(`Successfully joined the room: ${roomName}`);
    } else {
      toast.error("Room Name and Room ID are required!");
    }
  };

  const createNewRoom = () => {
    if (roomName.trim() !== "") {
      const newRoomId = roomId.trim() !== "" ? roomId : generateRoomId();

      socket.emit("create_room", newRoomId, username);
      socket.emit("join_room", newRoomId, username);

      setCurrentRoom({
        id: newRoomId,
        name: roomName,
      });

      addToRecentRooms({
        id: newRoomId,
        name: roomName,
      });

      navigate(`/room/${newRoomId}`, {
        state: {
          roomName,
        },
      });

      toast.success(`Created and joined new room: ${roomName}`);

      setRoomName("");
      setRoomId("");
      setIsCreating(false);
    } else {
      toast.error("Room Name is required!");
    }
  };

  const joinExistingRoom = (room) => {
    socket.emit("join_room", room.id, username);

    setCurrentRoom(room);
    addToRecentRooms(room);

    navigate(`/room/${room.id}`, {
      state: {
        roomName: room.name,
      },
    });

    toast.success(`Rejoined room: ${room.name}`);
  };

  const leaveRoom = () => {
    if (currentRoom) {
      socket.emit("leave_room", currentRoom.id, username);
      socket.off("room_users_update");

      localStorage.removeItem("currentRoom");
      localStorage.removeItem("currentRoomName");

      setCurrentRoom(null);
      setOnlineUsers([]);

      navigate("/room");
      toast.success(`Left room: ${currentRoom.name}`);
    }
  };

  const continueToChat = () => {
    if (currentRoom) {
      navigate(`/room/${currentRoom.id}`, {
        state: {
          roomName: currentRoom.name,
        },
      });
    }
  };

  const copyRoomId = () => {
    if (currentRoom) {
      navigator.clipboard.writeText(currentRoom.id);
      toast.success("Room ID copied to clipboard!");
    }
  };

  return (
    <div className="px-2 sm:px-0">
      <Toaster position="top-right" />
      
      {/* Header - Responsive */}
      <div className="text-center mb-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold uppercase">
          Room
        </h2>
        <p className="border-2 mx-2 sm:mx-6 rotate-[4deg] mt-2"></p>
      </div>

      <div className="flex items-center justify-center py-4 sm:py-8">
        <div className="p-4 sm:p-6 lg:p-8 shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-lg">
          {currentRoom ? (
            // Already in a room view - Responsive
            <>
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl text-white font-bold mb-2">
                  Current Room
                </h1>
                <div className="bg-[#9269FD] p-3 sm:p-4 rounded-lg my-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    {currentRoom.name}
                  </h2>
                  <div className="flex items-center justify-center text-xs sm:text-sm text-gray-200">
                    <span>Room ID: {currentRoom.id}</span>
                    <button
                      onClick={copyRoomId}
                      className="ml-2 text-white hover:text-gray-300"
                      title="Copy Room ID"
                    >
                      <Copy size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Online Users - Responsive */}
                {onlineUsers.length > 0 && (
                  <div className="bg-gray-700 p-2 sm:p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-center gap-2 text-gray-300 mb-2">
                      <Users size={16} className="sm:w-4 sm:h-4" />
                      <span className="text-sm sm:text-base">{onlineUsers.length} Online</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                      {onlineUsers.map((user, idx) => (
                        <div
                          key={idx}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                            user === username
                              ? "bg-[#9269FD] text-white"
                              : "bg-gray-600 text-gray-200"
                          }`}
                        >
                          {user}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-4 sm:mb-6">
                <button
                  onClick={continueToChat}
                  className="flex-1 bg-[#9269FD] hover:bg-purple-500 text-white p-2.5 sm:p-3 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Continue to Chat <ArrowRight size={16} className="sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={leaveRoom}
                  className="bg-red-600 hover:bg-red-700 text-white p-2.5 sm:p-3 rounded-lg transition flex items-center justify-center sm:w-auto"
                  title="Leave Room"
                >
                  <LogOut size={16} className="sm:w-4 sm:h-4" />
                  <span className="ml-2 sm:hidden">Leave Room</span>
                </button>
              </div>

              <div className="border-t border-gray-700 pt-4 sm:pt-6 mt-2">
                <h3 className="text-base sm:text-lg text-white font-semibold mb-3">
                  Join Another Room
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <input
                    onChange={(event) => setRoomName(event.target.value)}
                    type="text"
                    placeholder="Room Name"
                    className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
                  />
                  <input
                    onChange={(event) => setRoomId(event.target.value)}
                    type="text"
                    placeholder="Room ID"
                    className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
                  />
                  <button
                    onClick={joinTheRoom}
                    className="w-full bg-gray-600 hover:bg-gray-500 text-white p-2.5 sm:p-3 rounded-lg transition text-sm sm:text-base"
                  >
                    Join Room
                  </button>
                </div>
              </div>
            </>
          ) : (
            // Not in a room view - Responsive
            <>
              {/* Toggle between Join and Create - Responsive */}
              <div className="flex mb-4 sm:mb-6 bg-gray-700 p-1 rounded-lg">
                <button
                  onClick={() => setIsCreating(false)}
                  className={`flex-1 py-2 rounded-md transition text-xs sm:text-sm ${
                    !isCreating
                      ? "bg-[#9269FD] text-white"
                      : "bg-transparent text-gray-300 hover:text-white"
                  }`}
                >
                  Join a Room
                </button>
                <button
                  onClick={() => setIsCreating(true)}
                  className={`flex-1 py-2 rounded-md transition text-xs sm:text-sm ${
                    isCreating
                      ? "bg-[#9269FD] text-white"
                      : "bg-transparent text-gray-300 hover:text-white"
                  }`}
                >
                  Create a Room
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl text-white font-bold text-center mb-4 sm:mb-6">
                {isCreating ? "Create a New Room" : "Join a Room"}
              </h1>

              <div className="space-y-3 sm:space-y-4">
                <input
                  value={roomName}
                  onChange={(event) => setRoomName(event.target.value)}
                  type="text"
                  maxLength={14}
                  placeholder="Room Name"
                  className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
                />

                {isCreating ? (
                  <input
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                    type="text"
                    placeholder="Room ID (optional - will be generated if empty)"
                    className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
                  />
                ) : (
                  <input
                    value={roomId}
                    onChange={(event) => setRoomId(event.target.value)}
                    type="text"
                    placeholder="Room ID"
                    className="w-full p-2.5 sm:p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD] text-sm sm:text-base"
                  />
                )}

                <button
                  onClick={isCreating ? createNewRoom : joinTheRoom}
                  className="w-full bg-[#9269FD] hover:bg-purple-500 text-white p-2.5 sm:p-3 rounded-lg transition flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isCreating ? (
                    <>
                      <Plus size={16} className="sm:w-4 sm:h-4" /> Create Room
                    </>
                  ) : (
                    "Join Room"
                  )}
                </button>

                {/* Recent Rooms - Responsive */}
                {recentRooms.length > 0 && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-700">
                    <h3 className="text-base sm:text-lg text-white font-semibold mb-3">
                      Recent Room
                    </h3>
                    <div className="space-y-2">
                      {recentRooms.map((room, idx) => (
                        <button
                          key={idx}
                          onClick={() => joinExistingRoom(room)}
                          className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 text-white p-2.5 sm:p-3 rounded-lg transition"
                        >
                          <div className="text-left min-w-0 flex-1">
                            <div className="font-medium text-sm sm:text-base truncate">
                              {room.name}
                            </div>
                            <div className="text-xs text-gray-400">
                              ID: {room.id}
                            </div>
                          </div>
                          <ArrowRight size={16} className="sm:w-4 sm:h-4 flex-shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;