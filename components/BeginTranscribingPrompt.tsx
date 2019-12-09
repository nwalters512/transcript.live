import React from "react";
import Button from "./Button";

const BeginTranscribingPrompt = ({ onStart }) => (
  <div className="flex flex-col flex-grow items-center justify-center">
    <Button rounded className="text-xl" onClick={() => onStart()}>
      Begin transcribing
    </Button>
    <p className="text-gray-600 max-w-md p-4">
      Transcription uses your browser's built-in speech recognition
      capabilities. Audio data may be sent to a server for processing. Your data
      may be subject to your browser's privacy policies.
    </p>
  </div>
);

export default BeginTranscribingPrompt;
