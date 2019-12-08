import React, { useState } from "react";
import classnames from "classnames";
import BeginTranscribingPrompt from "../components/BeginTranscribingPrompt";
import {
  useSpeechRecognition,
  SpeechRecognitionProvider
} from "../contexts/SpeechRecognitionProvider";

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
  const [hasStarted, setHasStarted] = useState(false);
  const recognition = useSpeechRecognition();

  const startTranscribing = () => {
    setHasStarted(true);
    recognition.start();
  };

  return (
    <div className="flex flex-col bg-gray-900 w-screen h-screen">
      <div className="flex flex-row bg-gray-800 p-2 shadow-md">
        <NavControl onClick={() => recognition.start()}>Start</NavControl>
        <NavControl className="bg-red-700" onClick={() => recognition.stop()}>
          Stop
        </NavControl>
        <div className="ml-auto">
          <NavControl>Exit</NavControl>
        </div>
      </div>

      {!hasStarted && (
        <BeginTranscribingPrompt onStart={() => startTranscribing()} />
      )}
      {hasStarted && (
        <div className="flex flex-grow flex-col-reverse p-4 text-white text-2xl">
          {recognition.finalTranscript} {recognition.interimTranscript}
        </div>
      )}
    </div>
  );
};

export default () => (
  <SpeechRecognitionProvider>
    <Home />
  </SpeechRecognitionProvider>
);
