import React, { Fragment } from 'react';
import Nav from '../components/Nav';

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return <div className="flex flex-col bg-gray-900 w-screen h-screen">
    <Nav />
    <div className="flex flex-col bg-gray-900 flex-grow overflow-y-auto">
      <Component {...pageProps} />
    </div>
  </div>
}

export default MyApp
