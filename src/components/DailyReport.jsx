import React from "react";
import { BsFileEarmarkRuledFill, BsUpload } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";

const DailyReport = ({ chatId }) => {
  const Header = () => (
    <div className="h-12 w-full bg-white border-b items-center px-4 text-sm justify-between flex">
      <div className="flex space-x-2 items-center h-full">
        <div className="w-8 h-8 rounded-full bg-gray-100"></div>
        <p>모하메드 알가잘리</p>
      </div>
      <button className="flex h-8 px-3 bg-green-700 text-white items-center rounded-sm space-x-2 filter hover:brightness-125">
        <BsUpload />
        <p>일지 업로드</p>
      </button>
    </div>
  );

  const Cell = () => (
    <button className="w-full h-12 bg-white border-b flex items-center pr-4 space-x-4 text-gray-500 group hover:text-sky-500 justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-14 text-gray-500 flex flex-col items-center justify-center border-r">
          <p style={{ fontSize: "10px" }} className="text-xs">
            JUN
          </p>
          <p className="text-xs">15</p>
        </div>
        <BsFileEarmarkRuledFill className="w-4 h-4" />
        <p className="text-sm group-hover:underline">20230613-1607-mohammad-algazali</p>
      </div>
      <div className="flex items-center space-x-4">
        <p className="text-xs text-gray-400">last edited: 2023.06.13 4:16pm</p>
        <AiFillDelete className="text-gray-400 hover:text-red-500" />
      </div>
    </button>
  );

  return (
    <div style={{ height: "calc(100vh - 5rem)" }} className="w-full h-screen bg-white">
      <Header />

      <div style={{ height: "calc(100vh - 8rem)" }} className="w-full h-full overflow-y-auto pb-12 flex flex-col">
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
};

export default DailyReport;
