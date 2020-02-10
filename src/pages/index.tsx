import React, { useState, Fragment } from "react";
import Head from "next/head";
import classnames from "classnames";
import BeginTranscribingPrompt from "../components/BeginTranscribingPrompt";
import {
  useSpeechRecognition,
  SpeechRecognitionProvider
} from "../contexts/SpeechRecognitionProvider";
import Modal from "../components/Modal";
import Button from "../components/Button";

const Home = () => {
  const [showNotSupportedModal, setShowNotSupportedModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const recognition = useSpeechRecognition();

  const startTranscribing = () => {
    if (!recognition.supported) {
      setShowNotSupportedModal(true);
      return;
    }

    // Check if the user has granted access to the microphone
    navigator.permissions.query({ name: "microphone" }).then(result => {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          // We can safely start listening
          setHasStarted(true);
          recognition.start();
        })
        .catch(err => setShowPermissionsModal(true));
      return;
    });
  };

  const renderedTranscript = recognition.transcript || (
    <span className="text-gray-600">Waiting for speech...</span>
  );

  return (
    <Fragment>
      <Head>
        <title>transcript.live</title>
      </Head>
      <Modal
        title="Broswer not supported"
        show={showNotSupportedModal}
        onHide={() => setShowNotSupportedModal(false)}
      >
        <p className="mb-2">
          Your browser does not support speech recognition. We recommend using
          this app on Google Chrome on a desktop computer.
        </p>
        <Button onClick={() => setShowNotSupportedModal(false)}>OK</Button>
      </Modal>

      <Modal
        title="Microphone permissions required"
        show={showPermissionsModal}
        onHide={() => setShowPermissionsModal(false)}
      >
        <p className="mb-2">
          You must grant access to your microphone to begin transcribing. Please
          grant permissions and try again.
        </p>
        <Button onClick={() => setShowPermissionsModal(false)}>OK</Button>
      </Modal>

      {!hasStarted && (
        <BeginTranscribingPrompt onStart={() => startTranscribing()} />
      )}

      {hasStarted && (
        <Fragment>
          <button
            className={classnames(
              "block py-2 px-4 m-2 rounded text-white focus:outline-none focus:shadow-outline",
              recognition.isListening ? "bg-red-700" : "bg-blue-700"
            )}
            onClick={() =>
              recognition.isListening ? recognition.stop() : recognition.start()
            }
          >
            {recognition.isListening ? "Stop" : "Resume"}
          </button>
          <div className="flex flex-grow flex-col-reverse p-4 text-white text-2xl overflow-y-auto">
            {renderedTranscript}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default () => (
  <SpeechRecognitionProvider>
    <Home />
  </SpeechRecognitionProvider>
);
