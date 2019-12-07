import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import { useSpeechRecognition } from "../components/useSpeechRecognition";

const Home = () => {
  const wig = useSpeechRecognition();
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {wig.finalTranscript}
      <br />
      {wig.interimTranscript}

      <button onClick={() => wig.start()}>start</button>
      <button onClick={() => wig.stop()}>stop</button>

      <h1 className="text-4xl">Hello, world</h1>
    </div>
  );
};

export default Home;
