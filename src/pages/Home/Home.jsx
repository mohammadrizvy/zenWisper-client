/* eslint-disable react/no-unescaped-entities */
// src/pages/Home/Home.jsx - Fully Responsive Version
const Home = () => {
  return (
    <div className="flex items-center justify-center h-full min-h-[50vh] px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animation/Image - Responsive */}
        <img
          className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
          src="https://i.imgur.com/wAdNa6U.gif"
          alt="Hamster animation"
        />
        
        {/* Main Greeting - Responsive */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold mt-4">
          Kon'nichiwa!
        </h1>
        
        {/* Subtitle - Responsive */}
        <p className="text-sm sm:text-base mt-4 chat-text font-semibold text-gray-400">
          No chat available please
        </p>
        
        {/* Call to action - Responsive */}
        <h2 className="text-lg sm:text-xl chat-text text-white font-bold underline mt-2">
          Select a chat to start conversation
        </h2>
        
        {/* Additional help text for mobile */}
        <p className="text-xs sm:text-sm text-gray-500 mt-4 md:hidden">
          Use the menu button in the top-left to navigate between chats, rooms, and favorites.
        </p>
      </div>
    </div>
  );
};

export default Home;