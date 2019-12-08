import React from "react";

const BeginTranscribingPrompt = ({ onStart }) => (
  <div className="flex flex-col flex-grow items-center justify-center">
    <button
      className="bg-blue-700 text-white text-xl py-2 px-4 mb-4 rounded-full focus:outline-none focus:shadow-outline"
      onClick={() => onStart()}
    >
      Begin transcribing
    </button>
    <p className="text-gray-600 max-w-md p-4">
      Transcription uses your browser's built-in speech recognition
      capabilities. Audio data may be sent to a server for processing. Your data
      may be subject to your browser's privacy policies.
    </p>
  </div>
);

export default BeginTranscribingPrompt;
