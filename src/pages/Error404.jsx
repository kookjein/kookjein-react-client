import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <p className="text-9xl font-nanum font-bold text-zinc-300 mt-6">404</p>
        <p className="text-6xl mt-4 text-green-700">Server maintenance</p>
        <p className="text-xl mt-4 text-zinc-400">We're improving Kookjein - We'll be right back.</p>

        <Link to={"/"}>
          <button className="text-white bg-green-700 mt-12 text-xl p-2 px-4 rounded filter hover:brightness-125">Back to Main page</button>
        </Link>
      </div>
    </div>
  );
};

export default Error404;
