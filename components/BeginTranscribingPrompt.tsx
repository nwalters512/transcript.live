import React from "react";

const BeginTranscribingPrompt = ({ onStart }) => (
  <div className="flex flex-column items-center justify-center">
    <button
      className="bg-blue-700 text-white text-xl py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      onClick={() => onStart()}
    >
      Begin transcribing
    </button>
  </div>
);

export default BeginTranscribingPrompt;
