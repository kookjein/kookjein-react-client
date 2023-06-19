import React from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { IoDocumentAttachOutline } from "react-icons/io5";

const Contracts = ({ chatId }) => {
  const Header = () => (
    <div className="h-12 w-full bg-white border-b items-center px-4 text-sm justify-between flex">
      <div className="flex space-x-2 items-center h-full">
        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
        <p>모하메드 알가잘리</p>
      </div>
    </div>
  );

  const Cell = ({ title }) => (
    <div>
      <button
        style={{ aspectRatio: 1 }}
        className="w-full rounded mt-4 flex items-center justify-center bg-white border hover:bg-gray-100 group"
      >
        <IoDocumentAttachOutline className="w-20 h-20 text-gray-400 group-hover:hidden" />
        <AiOutlineDownload className="w-20 h-20 text-gray-400 group-hover:flex hidden"/>
      </button>
      <div className="mt-3 px-1 space-y-2 text-xs">
        <p className="font-bold">{title}</p>
        <p className="">COMPANY</p>
        <p className="">EMPLOYEE</p>
        <p className="text-gray-500">2023.06.23</p>
      </div>
    </div>
  );

  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
      <Header />

      <div
        style={{ height: "calc(100vh - 8rem)" }}
        className="grid grid-cols-4 w-full h-full overflow-y-auto pb-12 flex p-6 gap-4 bg-gray-100"
      >
        <Cell title="Non-disclosure agreement" />
        <Cell title="Employement contract" />
        <Cell title="Milestone agreement" />
      </div>
    </div>
  );
};

export default Contracts;
