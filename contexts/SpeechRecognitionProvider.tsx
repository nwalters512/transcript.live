import React, { useContext } from "react";
import {
  useSpeechRecognition as useSpeechRecognitionInternal,
  ISpeechRecognition
} from "../hooks/useSpeechRecognition";

const SpeechRecognitionContext = React.createContext<ISpeechRecognition>(null);
const useSpeechRecognition = () => useContext(SpeechRecognitionContext);

const SpeechRecognitionProvider = ({ children }) => {
  const recognition = useSpeechRecognitionInternal();

  return (
    <SpeechRecognitionContext.Provider value={recognition}>
      {children}
    </SpeechRecognitionContext.Provider>
  );
};

const withSpeechRecognition = children => () => (
  <SpeechRecognitionProvider>{children}</SpeechRecognitionProvider>
);

export {
  SpeechRecognitionProvider,
  useSpeechRecognition,
  withSpeechRecognition
};
