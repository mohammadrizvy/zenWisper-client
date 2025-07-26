import { useParams, useLocation } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import ChatFeed from "../pages/ChatFeed/ChatFeed/ChatFeed";

const ChatFeedWrapper = () => {
  const { id } = useParams();
  const location = useLocation();
  const { data: users = [], isLoading } = useUsers();

  // Try to get state first
  const state = location.state;
  let partnerUsername, partnerEmail;

  if (state?.partnerUsername && state?.partnerEmail) {
    partnerUsername = state.partnerUsername;
    partnerEmail = state.partnerEmail;
  } else {
    // Fallback: find user by email param
    const user = users.find(u => u.email === id);
    partnerUsername = user?.username;
    partnerEmail = user?.email;
  }

  if (isLoading) {
    return <div className="text-white text-center p-8">Loading...</div>;
  }

  return (
    <ChatFeed
      key={partnerEmail} // force remount if partner changes
      {...{ partnerUsername, partnerEmail }}
    />
  );
};

export default ChatFeedWrapper;