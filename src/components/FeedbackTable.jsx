import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SheetWindow from "./SheetWindow";
import { IoIosArrowBack } from "react-icons/io";

const FeedbackTable = ({ setFeedbackOpen, currentFeedback }) => {
  const pageRef = useRef(null);
  const [pageRefSize, setPageRefSize] = useState({ width: 0, height: 0 });
  const hotRef = useRef(null);
  const hotDataRef = useRef(Array.from({ length: 100 }, () => ({ rowId: uuidv4() })));

  useEffect(() => {
    if (pageRef.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          console.log(width);
          setPageRefSize({ width: width, height: height });
        }
      });
      observer.observe(pageRef.current);
      return () => observer.disconnect();
    }
  }, [pageRef]);

  return (
    <div style={{ height: "calc(100vh - 8rem)" }} className="w-full bg-gray-100 z-10">
      <div className="h-12 w-full bg-white border-b flex items-center px-4 text-sm space-x-2 cursor-default text-gray-500 justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:text-black" onClick={() => setFeedbackOpen(false)}>
            <IoIosArrowBack className="w-5 h-5" />
          </button>
          <p className="text-lg">{currentFeedback ? "2023-07-21 FEEDBACK" : "New feedback"}</p>
        </div>
        <button
          className={`bg-green-700 text-white filter hover:brightness-125 border px-6 py-1.5 rounded font-semibold text-sm`}
        >
          Upload
        </button>
      </div>
      <div ref={pageRef} className={"w-full h-full"}>
        <SheetWindow hotRef={hotRef} hotRefSize={pageRefSize} hotDataRef={hotDataRef} />
      </div>
    </div>
  );
};

export default FeedbackTable;
