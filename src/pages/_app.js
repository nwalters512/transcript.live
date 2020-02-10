import React from "react";
import Nav from "../components/Nav";

import "../styles/index.css";

function MyApp(props) {
  const {
    Component,
    pageProps,
    router: { query }
  } = props;

  return (
    <div className="flex flex-col bg-gray-900 w-screen h-screen">
      {query.navbar !== "false" && <Nav />}
      <div className="flex flex-col bg-gray-900 flex-grow overflow-y-auto">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
