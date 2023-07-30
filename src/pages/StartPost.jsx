import React from "react";
import { useState } from "react";

const StartPost = () => {
  const [accountType, setaccountType] = useState();

  const Card = ({ cardType, text, icon }) => (
    <button
      onClick={() => setaccountType(cardType)}
      className={`${
        accountType === cardType ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
      } h-full w-full rounded border ring-green-600 transition flex items-start justify-center relative flex-col px-6`}
    >
      {icon}
      <h1 className="text-lg font-bold mt-4 text-start break-keep">{text}</h1>
      <div
        className={`${
          accountType === cardType ? "border-green-600 bg-green-600" : "border-gray-300"
        } w-5 h-5 bg-white rounded-full absolute top-3 right-3 border-2 p-0.5 flex items-center justify-center`}
      >
        {accountType === cardType && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
      </div>
    </button>
  );

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
      <div style={{ maxWidth: "1280px" }} className="w-full h-full bg-gray-100 p-4">
        <h1 className="font-bold text-xl">프로젝트 등록</h1>
        <h1 className="font-bold text-xl">프로젝트 방식</h1>
        <div className="flex w-80 space-x-4">
        <Card />
        <Card />
        </div>
     
      </div>
    </div>
  );
};

export default StartPost;
