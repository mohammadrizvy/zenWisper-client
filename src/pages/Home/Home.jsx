/* eslint-disable react/no-unescaped-entities */
const Home = () => {
  return (
    <div className="flex items-center mt-40 justify-center  bg-gray-900">
      <div className="text-center">
        {/* Lottie Animation */}
        {/* <Lottie animationData={hamster} style={{ width: 300, height: 300 }} /> */}
        {/* Alternatively, use an image */}
        <img
          className="mx-auto"
          src="https://i.imgur.com/wAdNa6U.gif"
          alt="Hamster animation"
        />
        <h1 className="text-4xl text-white  font-bold mt-4">
          Kon'nichiwa!
        </h1>
        <p className="text-base mt-4 font-semibold">No chat availabe please</p>
        <h1 className="text-xl text-white font-bold underline mt-4">
          Select a chat to start conversation
        </h1>
      </div>
    </div>
  );
};

export default Home;
