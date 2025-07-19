const About = () => {
  return (
    <div className="">
      <h1 className="text-3xl text-center font-bold mb-2">
        About ZenWisper <br /> ChatApp
      </h1>
      <p className="mb-4">
        ZenWisper ChatApp is a modern real-time chat application built with
        React, Express, and Socket.IO. It allows users to join chat rooms, send
        instant messages, and interact seamlessly with others. Messages are
        stored securely in a backend database, ensuring chat history is always
        available.
      </p>
      <ul className="mb-4 list-disc pl-5">
        <li>Join or create chat rooms using a unique Room ID</li>
        <li>Send and receive messages in real-time</li>
        <li>Persistent chat history for each room</li>
        <li>Responsive and user-friendly interface</li>
        <li>Powered by React, Express, MongoDB, and Socket.IO</li>
      </ul>
      <p>
        {`Whether you're collaborating with a team or chatting with friends,
        ZenWisper ChatApp provides a fast and reliable messaging experience.`}
      </p>
    </div>
  );
};

export default About;
