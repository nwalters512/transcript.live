import React from "react";

const Link = ({ href, children }) => (
  <a href={href} className="text-blue-500 hover:underline">
    {children}
  </a>
);

const Heading = ({ children }) => (
  <h1 className="text-2xl mb-3 mt-5">{children}</h1>
);

const Paragraph = ({ children }) => <p className="mb-3">{children}</p>;

const About = () => (
  <div className="container max-w-3xl mx-auto mt-8 text-white">
    <Heading>What is this?</Heading>
    <Paragraph>
      This is an app to provide realtime captions (transcriptions) of audio.
      Captions can make your meeting, webcast, or other event more inclusive for
      hearing-impaired individuals.
    </Paragraph>
    <Heading>Origins of this app</Heading>
    <Paragraph>
      This app was born out of the need to provide live captions for meetings at
      work. Google Slides can provide{" "}
      <Link href="https://support.google.com/docs/answer/9109474?hl=en">
        live captions
      </Link>
      , which works well when a meeting consists of a slideshow presentation.
      However, for presentations that required other applications to be
      screen-shared, things didn't work as smoothly. People were resorting to
      positioning empty slideshows behind their other windows just to take
      advantage of captioning.
    </Paragraph>
    <Paragraph>
      This application is designed to offer a fast and simple alternative to
      using Google Slides to provide captions. It uses the{" "}
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
