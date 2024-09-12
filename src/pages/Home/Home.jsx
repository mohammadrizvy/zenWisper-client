/* eslint-disable react/no-unescaped-entities */
// import Lottie from "lottie-react";
// import hamster from "/public/Aniki-Hamster.json"; // Make sure the file path is correct

const Home = () => {
  return (
    <div className="text-4xl text-red-800 flex ">
      <div className="mx-auto h-screen flex flex-col items-center w-[40%] justify-center">
        {/* Lottie Animation */}
        {/* <Lottie animationData={hamster} style={{ width: 300, height: 300 }} /> */}
        {/* Alternatively, use an image */}
        <img
          className="mx-auto"
          src="https://i.imgur.com/wAdNa6U.gif"
          alt="Hamster animation"
        />
        <h1 className="text text-white font-bold mt-4">
          Kon'nichiwa! Start chatting
        </h1>
      </div>
    </div>
  );
};

export default Home;
