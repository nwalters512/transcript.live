import { useState, useEffect, useRef } from "react";

const BrowserSpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

const browserSupportsSpeechRecognition = !!BrowserSpeechRecognition;

const concatTranscripts = (...transcriptParts: string[]) =>
  transcriptParts
    .map(t => t.trim())
    .join(" ")
    .trim();

/**
 * Based on https://github.com/FoundersFactory/react-speech-recognition/blob/master/src/SpeechRecognition.js
 */
export const useSpeechRecognition = () => {
  const recognitionRef = useRef<SpeechRecognition>(null);
  const finalTranscriptRef = useRef("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

  useEffect(() => {
    recognitionRef.current = new BrowserSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.onresult = event => {
      let newInterimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current = concatTranscripts(
            finalTranscriptRef.current,
            event.results[i][0].transcript
          );
        } else {
          newInterimTranscript = concatTranscripts(
            newInterimTranscript,
            event.results[i][0].transcript
          );
        }
      }
      setInterimTranscript(newInterimTranscript);
      setFinalTranscript(finalTranscriptRef.current);
    };
    return () => {
      recognitionRef.current.abort();
    };
  }, []);

  const start = () => recognitionRef.current?.start();
  const stop = () => recognitionRef.current?.stop();
  const reset = () => {};
  const abort = () => {};

  return {
    supported: browserSupportsSpeechRecognition,
    start,
    stop,
    reset,
    abort,
    interimTranscript,
    finalTranscript,
    recognition: recognitionRef.current
  };
};
