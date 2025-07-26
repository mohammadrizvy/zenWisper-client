// src/pages/ChatFeed/ChatFeed/ChatFeed.jsx
import { useEffect, useState, useRef } from "react";
import { Forward, ArrowLeft } from "lucide-react";
import io from "socket.io-client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { usePrivateMessages } from "../../../hooks/usePrivateMessages";

const ChatFeed = () => {
    const { id: partnerId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { partnerUsername, partnerEmail } = location.state || {};
    
    const currentUserEmail = localStorage.getItem("email");
    const currentUsername = localStorage.getItem("username");
    
    const [currentMessage, setCurrentMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [isTyping, setIsTyping] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const messagesEndRef = useRef(null);

    // Generate chat ID (consistent ordering)
    const chatId = [currentUserEmail, partnerEmail].sort().join("_");

    // Use React Query hook to fetch messages
    const { isPending, messages = [], isError } = usePrivateMessages(chatId);

    // Local state to track messages
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
        if (!chatId || !currentUserEmail) return;

        const newSocket = io.connect(`${import.meta.env.VITE_BACKEND_URL}`);
        setSocket(newSocket);

        // Join the private chat
        newSocket.emit("join_private_chat", chatId, currentUserEmail);
        newSocket.emit("user_online", currentUserEmail);

        // Listen for incoming messages
        const handleReceiveMessage = (data) => {
            setChatMessages((prevMessages) => {
                const messageExists = prevMessages.some(
                    (msg) => msg.message === data.message &&
                        msg.senderEmail === data.senderEmail &&
                        msg.time === data.time
                );

                if (messageExists) {
                    return prevMessages;
                }

                return [...prevMessages, data];
            });
        };

        // Listen for typing indicators
        const handleUserTyping = (data) => {
            if (data.userEmail !== currentUserEmail) {
                setIsTyping(data.isTyping);
            }
        };

        newSocket.on("receive_private_message", handleReceiveMessage);
        newSocket.on("user_typing", handleUserTyping);

        // Cleanup function
        return () => {
            newSocket.off("receive_private_message", handleReceiveMessage);
            newSocket.off("user_typing", handleUserTyping);
            newSocket.emit("leave_private_chat", chatId, currentUserEmail);
            newSocket.disconnect();
        };
    }, [chatId, currentUserEmail]);

    // Handle typing indicators
    const handleTyping = () => {
        if (socket && chatId) {
            socket.emit("typing_start", {
                chatId,
                userEmail: currentUserEmail,
                username: currentUsername
            });

            // Clear existing timeout
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            // Set new timeout to stop typing indicator
            const timeout = setTimeout(() => {
                socket.emit("typing_stop", {
                    chatId,
                    userEmail: currentUserEmail,
                    username: currentUsername
                });
            }, 1000);

            setTypingTimeout(timeout);
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (currentMessage.trim() !== "" && socket && chatId) {
            const messageData = {
                chatId,
                senderEmail: currentUserEmail,
                senderUsername: currentUsername,
                receiverEmail: partnerEmail,
                receiverUsername: partnerUsername,
                message: currentMessage,
                time: new Date(Date.now()).getHours().toString().padStart(2, "0") +
                    ":" +
                    new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
            };

            // Send message via socket
            socket.emit("send_private_message", messageData);

            // Clear input immediately
            setCurrentMessage("");

            // Stop typing indicator
            socket.emit("typing_stop", {
                chatId,
                userEmail: currentUserEmail,
                username: currentUsername
            });

            // Clear typing timeout
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
        }
    };

    if (!partnerEmail || !partnerUsername) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-900">
                <div className="text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Invalid Chat</h2>
                    <p className="mb-4">This chat session is invalid or expired.</p>
                    <button
                        onClick={() => navigate("/chat")}
                        className="bg-[#9269FD] hover:bg-purple-600 px-4 py-2 rounded-md flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={18} />
                        Back to Chats
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="custom-bg flex flex-col h-screen">
            {/* Header */}
            <div className="bg-[#1B1C25] flex-none border-b border-gray-600 shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => navigate("/chat")}
                            className="lg:hidden text-white hover:text-gray-300"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        
                        <div className="flex items-center gap-4">
                            <img
                                src="https://cdn.hero.page/pfp/81c2b3b4-bc9b-4286-91fe-a974f3ca6ae5-mysterious-purple-haired-boy-stunning-purple-anime-pfp-boys-1.png"
                                alt="Partner Avatar"
                                className="w-12 h-12 rounded-full border-2 border-purple-500"
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-white">
                                    {partnerUsername}
                                </h2>
                                <p className="text-sm text-gray-400">
                                    {isTyping ? "typing..." : "online"}
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-6"> {/* Spacer for centering */}</div>
                    </div>
                </div>
            </div>

            {/* Chat Feed */}
            <div
                className="flex-grow p-4 overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 180px)" }}
            >
                {isPending ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="text-center">
                            <img
                                className="mx-auto"
                                src="https://i.imgur.com/wAdNa6U.gif"
                                alt="Loading animation"
                            />
                            <h1 className="text-2xl text-white font-bold mt-4">
                                Loading messages...
                            </h1>
                        </div>
                    </div>
                ) : isError ? (
                    <div className="text-center p-4 bg-red-100 text-red-800 rounded-md">
                        Failed to load messages. Please try again.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {chatMessages.length === 0 ? (
                            <div className="text-center p-8">
                                <div className="text-6xl mb-4">👋</div>
                                <h3 className="text-xl text-white font-semibold mb-2">
                                    Start a conversation with {partnerUsername}
                                </h3>
                                <p className="text-gray-400">
                                    Send your first message to begin chatting!
                                </p>
                            </div>
                        ) : (
                            chatMessages.map((msg, index) => (
                                <div
                                    key={`${msg.senderEmail}-${msg.time}-${index}`}
                                    className={`flex w-full mb-3 ${
                                        msg.senderEmail === currentUserEmail
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`rounded-2xl px-4 py-3 shadow-md ${
                                            msg.senderEmail === currentUserEmail
                                                ? "bg-[#9269FD] text-white rounded-br-none"
                                                : "bg-gray-700 text-white rounded-bl-none"
                                        } max-w-[75%] break-words`}
                                    >
                                        <p className="text-base leading-relaxed mb-1">
                                            {msg.message}
                                        </p>
                                        <p className="text-xs text-gray-300 text-right">
                                            {msg.time}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                        {isTyping && (
                            <div className="flex justify-start mb-3">
                                <div className="bg-gray-700 text-white rounded-2xl rounded-bl-none px-4 py-3 max-w-[75%]">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className="flex items-center p-4">
                <img
                    src="/exampleUserImage.png"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full mr-3"
                />
                <form onSubmit={handleOnSubmit} className="flex w-full items-center">
                    <input
                        className="flex-grow p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#9269FD]"
                        type="text"
                        placeholder={`Message ${partnerUsername}...`}
                        value={currentMessage}
                        onChange={(event) => {
                            setCurrentMessage(event.target.value);
                            handleTyping();
                        }}
                    />
                    <button
                        type="submit"
                        disabled={currentMessage.trim() === "" || isPending}
                        className="ml-3 bg-[#9269FD] p-3 rounded-md text-white flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#7d4de7] transition-colors"
                    >
                        Send <Forward size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatFeed;