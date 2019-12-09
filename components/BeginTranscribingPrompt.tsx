import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const BeginTranscribingPrompt = ({ onStart }) => {
  const [showDataHandlingModal, setShowDataHandlingModal] = useState(false);
  return (
    <div className="flex flex-col flex-grow items-center justify-center">
      <Button rounded className="text-xl" onClick={() => onStart()}>
        Begin transcribing
      </Button>
      <button
        className="m-4 text-gray-600 hover:underline"
        onClick={() => setShowDataHandlingModal(true)}
      >
        How is my audio data handled?
      </button>
      <Modal
        title="Audio data handling"
        show={showDataHandlingModal}
        onHide={() => setShowDataHandlingModal(false)}
      >
        <p className="mb-2">
          This site does not record or store any audio data itself.
          Transcriptions are provided by features built into your web browser.
          Audio may be transcribed on your device, or it may be sent to a server
          for processing. See your browser's privacy policy for more
          information.
        </p>
        <Button onClick={() => setShowDataHandlingModal(false)}>OK</Button>
      </Modal>
    </div>
  );
};

export default BeginTranscribingPrompt;
