import React from "react";
import classnames from "classnames";
import { useSpeechRecognition } from "../components/useSpeechRecognition";

const NavControl = ({ className = null, ...props }) => (
  <button
    className={classnames(
      "bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline",
      className
    )}
    {...props}
  ></button>
);

const Home = () => {
  const wig = useSpeechRecognition();
  return (
    <div className="flex flex-col bg-gray-900 w-screen h-screen">
      <div className="flex flex-row bg-gray-800 p-2 shadow-md">
        <NavControl onClick={() => wig.start()}>Start</NavControl>
        <NavControl className="bg-red-700" onClick={() => wig.stop()}>
          Stop
        </NavControl>
        <div className="ml-auto">
          <NavControl>Exit</NavControl>
        </div>
      </div>

      <div className="flex flex-grow flex-col-reverse p-6 text-white text-2xl">
        {wig.finalTranscript} {wig.interimTranscript}
      </div>
    </div>
  );
};

export default Home;
