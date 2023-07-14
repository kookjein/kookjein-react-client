import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";

const FeedbackDetail = ({ setFeedbackOpen, currentFeedback }) => {
  const hotDataRef = useRef(Array.from({ length: 100 }, () => ({ rowId: uuidv4() })));

  const uploadPressed = () => {
    console.log(hotDataRef.current);
  };

  const Cell = ({ count }) => {
    return (
      <div className="w-full h-36 border-b bg-white flex items-center space-x-4">
        <div className="w-10 border-r h-full flex items-center justify-center flex-shrink-0 bg-gray-100">
          <p className="text-sm text-gray-500">{count + 1}</p>
        </div>
        <p className="text-sm flex-shrink-0 w-12">진행전</p>
        <button className="w-32 h-32 bg-gray-100 border rounded flex-shrink-0"></button>
        <div style={{ whiteSpace: "pre-line" }} className="h-full py-2 text-sm pr-4 break-keep">
          Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation of graphic
          elements in documents, without the need for formal copy. Using Lorem Ipsum allows designers to put together
          layouts and the form of the content before the content has been created, giving the design and production
          process more freedom.
        </div>

        <div className="w-32 flex-shrink-0 border-l h-full"></div>
      </div>
    );
  };

  return (
    <div style={{ height: "calc(100vh - 8rem)" }} className="w-full bg-gray-100 z-10">
      <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2 cursor-default text-gray-500 justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:text-black" onClick={() => setFeedbackOpen(false)}>
            <IoIosArrowBack className="w-5 h-5" />
          </button>
          <p className="text-lg">2023-07-21 FEEDBACK</p>
        </div>
        <button
          onClick={uploadPressed}
          className={`bg-green-700 text-white filter hover:brightness-125 border px-6 py-1.5 rounded font-semibold text-sm`}
        >
          Save
        </button>
      </div>
      <div className={"w-full h-full overflow-y-auto"}>
        <div className="w-full h-8 border-b bg-gray-300 flex items-center space-x-4 font-bold text-gray-500">
          <div className="w-10 border-r flex items-center justify-center flex-shrink-0">
            <p className="text-sm">#</p>
          </div>
          <p className="text-sm flex-shrink-0 w-12">Status</p>
          <div className="w-32 flex-shrink-0 border-l text-sm flex justify-center border-r">Screenshot</div>
          <div
            style={{ whiteSpace: "pre-line" }}
            className="h-full py-2 text-sm pr-4 break-keep w-full flex justify-center"
          >
            Comment
          </div>
          <div className="w-32 flex-shrink-0 border-l h-full"></div>
        </div>
        {new Array(10).fill(0).map((item, index) => (
          <Cell key={index} count={index} />
        ))}
      </div>
    </div>
  );
};

export default FeedbackDetail;
