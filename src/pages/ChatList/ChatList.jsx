import { Link } from "react-router-dom";
import useUsers from "../../hooks/useUsers";

const ChatList = () => {
  const { data: users = [], isLoading } = useUsers();

  console.log(users);

  if (isLoading) {
    return <> </>;
  }

  return (
    <div className="">
      {/* Chat List */}
      <div className="flex mb- justify-between ">
        <h2 className="text-6xl font-semibold uppercase mb-4 mx-auto">Chats</h2>
      </div>
        <p className="border-2 rotate-[5deg]"></p>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search chat"
        className="w-full p-2 mb-4 mt-5 rounded bg-gray-800 text-white"
      />

      {/* Chat Items */}
      {/* Example Chat Items */}
      {users.map((user, index) => (
        <Link
          to={`/chat/${user._id}`}
          key={index}
          className="flex items-center p-3 mb-2 bg-gray-800 rounded"
        >
          <img
            src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
            alt="User Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{user.username}</p>
            <p className="text-xs text-gray-400 chat-text">
              Whats up, how are you?
            </p>
          </div>
        </Link>
      ))}

      {/* Repeat similar divs for other chat items */}
    </div>
  );
};

export default ChatList;
