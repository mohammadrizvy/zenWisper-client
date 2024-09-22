import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
// import ChatFeed from "../ChatFeed/ChatFeed";

const socket = io.connect("http://localhost:5000/");

const Room = () => {
  const [roomName, setRoomName] = useState();
  const [roomId, setRoomId] = useState();
  const navigate = useNavigate(); 

const joinTheRoom = () => {
  if (roomName !== "" && roomId !== "") {
    socket.emit("join_room", roomId);
    // Navigate to the chat feed for the room
     navigate(`/room/${roomId}`, {
       state: {
         roomName,
       },
     });


    toast.success(`Successfuly joind the room : ${roomId}`)
  }
};

  return (
    <div className=" flex items-center justify-center bg-gray-900">
      <Toaster/>
      <div className=" p-8  shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-white font-bold text-center mb-6">
          Join A Room
        </h1>

        <div className="space-y-4">
          {/* Room Name Input */}
          <input
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
            type="text"
            placeholder="Room Name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
          />

          {/* Room ID Input */}
          <input
            onChange={(event) => {
              setRoomId(event.target.value);
            }}
            type="text"
            placeholder="Room ID"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
          />

          {/* Join Button */}
          <button
            onClick={joinTheRoom}
            className="w-full btn  bg-[#9269FD] hover:bg-purple-500 text-white p-3 rounded-lg transition"
          >
            Join Room
          </button>
          {/* <ChatFeed socket={socket} username={roomName} room={roomId}></ChatFeed> */}
        </div>
      </div>
    </div>
  );
};

export default Room;
