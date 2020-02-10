import React from "react";
import Head from "next/head";

const Link = ({ href, children }) => (
  <a href={href} className="text-blue-500 hover:underline">
    {children}
  </a>
);

const Heading = ({ children }) => (
  <h2 className="text-2xl mb-3 mt-5">{children}</h2>
);

const Paragraph = ({ children }) => <p className="mb-3">{children}</p>;

const About = () => (
  <div className="container max-w-3xl mx-auto mt-8 text-white px-4">
    <Head>
      <title>transcript.live | About</title>
    </Head>
    <Heading>What is this?</Heading>
    <Paragraph>
      This is an app to provide realtime captions (transcriptions) of audio.
      Captions can make your meeting, webcast, or other event more inclusive for
      individuals with hearing impairments.
    </Paragraph>
    <Paragraph>
      You can use this app as the primary window on your display, but it can
      also be used to provide captions with other content on screen. You can
      position this app behind another window and resize the window in the
      foreground to show a few lines of captions below.
    </Paragraph>
    <img
      src="/demo.png"
      className="shadow-md w-full max-w-xl mx-auto"
      alt="Screenshot showing how app can be used with other applications."
    />
    <Heading>Origins of this app</Heading>
    <Paragraph>
      I built this built to scratch a personal itch. At work, we found ourselves
      needing to provide captions for meetings. Google Slides can provide{" "}
      <Link href="https://support.google.com/docs/answer/9109474?hl=en">
        live captions
      </Link>
      , which works well when a meeting consists of a slideshow presentation.
      However, for presentations that required other applications to be
      screen-shared, things didn't work as smoothly. We were resorting to
      positioning empty slideshows in presentation mode behind their other
      windows just to take advantage of their captions.
    </Paragraph>
    <Paragraph>
      This application is designed to offer a fast and simple alternative to
      using Google Slides for captions. It uses the{" "}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition">
        same technology
      </Link>{" "}
      as Google Slides, so you'll still get the exact same transcriptions. It
      just skips the overhead of empty slide decks and messing with presentation
      mode.
    </Paragraph>
    <Heading>The technical bits</Heading>
    <Paragraph>
      This app is built and hosted with a variety of technologies:
    </Paragraph>
    <ul className="list-disc list-inside mb-3">
      <li>
        <Link href="https://reactjs.org/">React</Link>
      </li>
      <li>
        <Link href="https://nextjs.org/">Next.js</Link>
      </li>
      <li>
        <Link href="https://tailwindcss.com/">Tailwind CSS</Link>
      </li>
      <li>
        The{" "}
        <Link href="">
          <code>SpeechRecognition</code>
        </Link>{" "}
        web API
      </li>
      <li>
        <Link href="https://zeit.co/">Zeit Now</Link>
      </li>
    </ul>
    <Paragraph>
      The source code is available{" "}
      <Link href="https://github.com/nwalters512/transcript.live">
        on GitHub.
      </Link>{" "}
      Find a bug? Have an idea for an improvement? Submit an issue or pull
      request!
    </Paragraph>
  </div>
);

export default About;
