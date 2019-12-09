import React, { useState, Fragment } from "react";
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
    <Fragment>
      <Modal
        title="Broswer not supported"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <p className="mb-2">
          Your browser does not support speech recognition. We recommend using
          this app on Google Chrome on a desktop computer.
        </p>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
          onClick={() => setShowModal(false)}
        >
          OK
        </button>
      </Modal>

      {hasStarted && (
        <NavControl
          className={classnames(
            "block m-2",
            recognition.isListening ? "bg-red-700" : "bg-blue-700"
          )}
          onClick={() =>
            recognition.isListening ? recognition.stop() : recognition.start()
          }
        >
          {recognition.isListening ? "Stop" : "Resume"}
        </NavControl>
      )}

      {!hasStarted && (
        <BeginTranscribingPrompt onStart={() => startTranscribing()} />
      )}
      {hasStarted && (
        <div className="flex flex-grow flex-col-reverse p-4 text-white text-2xl overflow-y-auto">
          {renderedTranscript}
        </div>
      )}
    </Fragment>
  );
};

export default () => (
  <SpeechRecognitionProvider>
    <Home />
  </SpeechRecognitionProvider>
);
