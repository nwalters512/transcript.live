import React from "react";
import Link from "next/link";

const Nav = () => (
  <div className="flex flex-row justify-between items-center bg-gray-800 p-2">
    <Link href="/">
      <a className="text-white tracking-widest font-light">transcript.live</a>
    </Link>
    <Link href="/about">
      <a className="bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        About
      </a>
    </Link>
  </div>
);

export default Nav;
