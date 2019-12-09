import { useState, useEffect, useRef, PureComponent } from "react";

export interface ISpeechRecognition {
  supported: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  abort: () => void;
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  isListening: boolean;
  recognition?: SpeechRecognition;
}

const TESTING_CONTENT =
  "This is some dummy initial content. The quick brown fox jumped over the lazy dog.";

const BrowserSpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

const isAndroidChrome =
  typeof window !== "undefined" && navigator.userAgent.indexOf("Android") >= 0;

/**
 * Unfortunately, Chrome on Android doesn't properly implement the
 * SpeechRecognition API; it incorrectly reports all results as final and
 * requires users to restart listening after every pause in speaking.
 * Rather than try to work around these issues, we'll just flag Android Chrome
 * as not supported.
 */
const browserSupportsSpeechRecognition =
  !!BrowserSpeechRecognition && !isAndroidChrome;

const concatTranscripts = (...transcriptParts: string[]) =>
  transcriptParts
    .map(t => t.trim())
    .join(" ")
    .trim();

const PUNCTUATION = [
  [".", "period"],
  [",", "comma"],
  ["!", "exclamation point"],
  ["?", "question mark"]
];

/**
 * Normalizes a transcript by replacing punctuation (.,!?) with their spelled
 * out versions ("period", "comma", etc.).
 *
 * @param transcript The transcript to normalize
 */
const normalizeTranscript = (transcript: string) =>
  PUNCTUATION.reduce((normalizedTranscript, punctuation) => {
    return normalizedTranscript
      .split(punctuation[0])
      .map(s => s.trim())
      .join(` ${punctuation[1]} `);
  }, transcript);

/**
 * Based on https://github.com/FoundersFactory/react-speech-recognition/blob/master/src/SpeechRecognition.js
 */
export const useSpeechRecognition = (): ISpeechRecognition => {
  const recognitionRef = useRef<SpeechRecognition>(null);
  const isListeningRef = useRef(false);
  const autoresumeRef = useRef(false);
  const finalTranscriptRef = useRef("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) return;
    const recognition = new BrowserSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = event => {
      let newInterimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscriptRef.current = concatTranscripts(
            finalTranscriptRef.current,
            normalizeTranscript(event.results[i][0].transcript)
          );
        } else {
          newInterimTranscript = concatTranscripts(
            newInterimTranscript,
            normalizeTranscript(event.results[i][0].transcript)
          );
        }
      }
      setInterimTranscript(newInterimTranscript);
      setFinalTranscript(finalTranscriptRef.current);
    };
    recognition.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };
    recognition.onend = () => {
      if (autoresumeRef.current) {
        recognition.start();
        return;
      }
      isListeningRef.current = false;
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    return () => {
      // We don't want to receive any more events since we're unmounting
      recognitionRef.current.onend = null;
      recognitionRef.current.abort();
    };
  }, []);

  const start = () => {
    if (!isListeningRef.current) {
      recognitionRef.current?.start();
    }
    autoresumeRef.current = true;
  };
  const stop = () => {
    recognitionRef.current?.stop();
    autoresumeRef.current = false;
  };
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
    transcript: concatTranscripts(finalTranscript, interimTranscript),
    isListening,
    recognition: recognitionRef.current
  };
};
