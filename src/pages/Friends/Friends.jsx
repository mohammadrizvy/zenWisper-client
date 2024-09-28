import { Link } from "react-router-dom";

const Friends = () => {
  const friends = [
    { id: 1, name: "Townsend Seary", status: "Online" },
    { id: 2, name: "Forest Kroch", status: "Offline" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Friends</h2>
      <input
        type="text"
        placeholder="Search chat"
        className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
      />

      <ul className="mt-2 space-y-4">
        {friends.map((friend) => (
          <li key={friend.id}>
            <Link to={`/friends/${friend.id}`}>
              <div className="flex items-center space-x-4 p-2 border-b border-gray-700">
                <div className="text-white">{friend.name}</div>
                <span className="text-gray-400">{friend.status}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
