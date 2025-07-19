import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { LogOut, Copy, ArrowRight, Users, Plus } from "lucide-react";

const socket = io.connect("http://localhost:5000/");

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
    ].slice(0, 1); // Keep only 5 most recent

    setRecentRooms(updatedRooms);
    localStorage.setItem("recentRooms", JSON.stringify(updatedRooms));
  };

  // Generate a random room ID
  const generateRoomId = () => {
    // Generates an 8-digit numeric room ID
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  const joinTheRoom = () => {
    if (roomName.trim() !== "" && roomId.trim() !== "") {
      // Save to localStorage
      localStorage.setItem("currentRoom", roomId);
      localStorage.setItem("currentRoomName", roomName);

      // Connect socket
      socket.emit("join_room", roomId, username);

      // Update current room state
      setCurrentRoom({
        id: roomId,
        name: roomName,
      });

      // Add to recent rooms
      addToRecentRooms({
        id: roomId,
        name: roomName,
      });

      // Navigate to chat
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
      // Generate a unique room ID if not provided
      const newRoomId = roomId.trim() !== "" ? roomId : generateRoomId();

      // Save to localStorage
      localStorage.setItem("currentRoom", newRoomId);
      localStorage.setItem("currentRoomName", roomName);

      // Connect socket and create room
      socket.emit("create_room", newRoomId, username);
      socket.emit("join_room", newRoomId, username);

      // Update current room state
      setCurrentRoom({
        id: newRoomId,
        name: roomName,
      });

      // Add to recent rooms
      addToRecentRooms({
        id: newRoomId,
        name: roomName,
      });

      // Navigate to chat
      navigate(`/room/${newRoomId}`, {
        state: {
          roomName,
        },
      });

      toast.success(`Created and joined new room: ${roomName}`);

      // Reset the form
      setRoomName("");
      setRoomId("");
      setIsCreating(false);
    } else {
      toast.error("Room Name is required!");
    }
  };

  const joinExistingRoom = (room) => {
    // Save to localStorage
    localStorage.setItem("currentRoom", room.id);
    localStorage.setItem("currentRoomName", room.name);

    // Connect socket
    socket.emit("join_room", room.id, username);

    // Update current room state
    setCurrentRoom(room);

    // Add to recent rooms
    addToRecentRooms(room);

    // Navigate to chat
    navigate(`/room/${room.id}`, {
      state: {
        roomName: room.name,
      },
    });

    toast.success(`Rejoined room: ${room.name}`);
  };

  const leaveRoom = () => {
    if (currentRoom) {
      // Disconnect socket
      socket.emit("leave_room", currentRoom.id, username);

      // Clear localStorage
      localStorage.removeItem("currentRoom");
      localStorage.removeItem("currentRoomName");

      // Reset state
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

  // const toggleMode = () => {
  //   setIsCreating(!isCreating);
  //   // Clear fields when switching modes
  //   setRoomId("");
  //   setRoomName("");
  // };

  return (
    <div className=" flex items-center justify-center bg-gray-900 py-8">
      <Toaster position="top-right" />

      <div className="p-8 shadow-lg w-full max-w-md bg-gray-800 rounded-lg">
        {currentRoom ? (
          // Already in a room view
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl text-white font-bold mb-2">
                Current Room
              </h1>
              <div className="bg-[#9269FD] p-4 rounded-lg my-4">
                <h2 className="text-xl font-semibold text-white mb-1">
                  {currentRoom.name}
                </h2>
                <div className="flex items-center justify-center text-sm text-gray-200">
                  <span>Room ID: {currentRoom.id}</span>
                  <button
                    onClick={copyRoomId}
                    className="ml-2 text-white hover:text-gray-300"
                    title="Copy Room ID"
                  >
                    <Copy size={14} />
                  </button>
                </div>
              </div>

              {/* Online Users */}
              {onlineUsers.length > 0 && (
                <div className="bg-gray-700 p-3 rounded-lg mb-4">
                  <div className="flex items-center justify-center gap-2 text-gray-300 mb-2">
                    <Users size={18} />
                    <span>{onlineUsers.length} Online</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {onlineUsers.map((user, idx) => (
                      <div
                        key={idx}
                        className={`px-3 py-1 rounded-full text-sm ${
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

            <div className="flex gap-3 mb-6">
              <button
                onClick={continueToChat}
                className="flex-1 bg-[#9269FD] hover:bg-purple-500 text-white p-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                Continue to Chat <ArrowRight size={18} />
              </button>

              <button
                onClick={leaveRoom}
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition flex items-center justify-center"
                title="Leave Room"
              >
                <LogOut size={18} />
              </button>
            </div>

            <div className="border-t border-gray-700 pt-6 mt-2">
              <h3 className="text-lg text-white font-semibold mb-3">
                Join Another Room
              </h3>
              <div className="space-y-4">
                <input
                  onChange={(event) => setRoomName(event.target.value)}
                  type="text"
                  placeholder="Room Name"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                />
                <input
                  onChange={(event) => setRoomId(event.target.value)}
                  type="text"
                  placeholder="Room ID"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                />
                <button
                  onClick={joinTheRoom}
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-lg transition"
                >
                  Join Room
                </button>
              </div>
            </div>
          </>
        ) : (
          // Not in a room view
          <>
            {/* Toggle between Join and Create */}
            <div className="flex mb-6 bg-gray-700 p-1 rounded-lg">
              <button
                onClick={() => setIsCreating(false)}
                className={`flex-1 py-2 rounded-md transition ${
                  !isCreating
                    ? "bg-[#9269FD] text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                Join a Room
              </button>
              <button
                onClick={() => setIsCreating(true)}
                className={`flex-1 py-2 rounded-md transition ${
                  isCreating
                    ? "bg-[#9269FD] text-white"
                    : "bg-transparent text-gray-300 hover:text-white"
                }`}
              >
                Create a Room
              </button>
            </div>

            <h1 className="text-3xl text-white font-bold text-center mb-6">
              {isCreating ? "Create a New Room" : "Join a Room"}
            </h1>

            <div className="space-y-4">
              <input
                value={roomName}
                onChange={(event) => setRoomName(event.target.value)}
                type="text"
                maxLength={14}
                placeholder="Room Name"
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
              />

              {isCreating ? (
                <input
                  value={roomId}
                  onChange={(event) => setRoomId(event.target.value)}
                  type="text"
                  placeholder="Room ID (optional - will be generated if empty)"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                />
              ) : (
                <input
                  value={roomId}
                  onChange={(event) => setRoomId(event.target.value)}
                  type="text"
                  placeholder="Room ID"
                  className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                />
              )}

              <button
                onClick={isCreating ? createNewRoom : joinTheRoom}
                className="w-full bg-[#9269FD] hover:bg-purple-500 text-white p-3 rounded-lg transition flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <Plus size={18} /> Create Room
                  </>
                ) : (
                  "Join Room"
                )}
              </button>

              {/* Recent Rooms */}
              {recentRooms.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="text-lg text-white font-semibold mb-3">
                    Recent Rooms
                  </h3>
                  <div className="space-y-2">
                    {recentRooms.map((room, idx) => (
                      <button
                        key={idx}
                        onClick={() => joinExistingRoom(room)}
                        className="w-full flex items-center justify-between bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition"
                      >
                        <div className="text-left">
                          <div className="font-medium">{room.name}</div>
                          <div className="text-xs text-gray-400">
                            ID: {room.id}
                          </div>
                        </div>
                        <ArrowRight size={18} />
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
  );
};

export default Room;
