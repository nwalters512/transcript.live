import React, { useState } from "react";
import classnames from "classnames";
import BeginTranscribingPrompt from "../components/BeginTranscribingPrompt";
import {
  useSpeechRecognition,
  SpeechRecognitionProvider
} from "../contexts/SpeechRecognitionProvider";
import Modal from "../components/Modal";

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
  const [showModal, setShowModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const recognition = useSpeechRecognition();

  const startTranscribing = () => {
    if (!recognition.supported) {
      setShowModal(true);
      return;
    }
    setHasStarted(true);
    recognition.start();
  };

  const renderedTranscript = recognition.transcript || (
    <span className="text-gray-600">Waiting for speech...</span>
  );

  return (
    <div className="flex flex-col bg-gray-900 w-screen h-screen">
      <Modal
        title="Broswer not supported"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <p className="mb-2">
          Your browser does not support speech recognition. We recommend you try
          Google Chrome on Android or a desktop computer.
        </p>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
          onClick={() => setShowModal(false)}
        >
          OK
        </button>
      </Modal>
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
          {renderedTranscript}
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
