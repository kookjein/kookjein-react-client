import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SheetWindow from "./SheetWindow";

const FeedbackTable = () => {
  const pageRef = useRef(null);
  const [pageRefSize, setPageRefSize] = useState({ width: 0, height: 0 });
  const hotRef = useRef(null);
  const hotDataRef = useRef(Array.from({ length: 100 }, () => ({ rowId: uuidv4() })));

  useEffect(() => {
    // console.log(pageRef.current.style.width)
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
    <div ref={pageRef} className={"w-full h-full"}>
      <SheetWindow hotRef={hotRef} hotRefSize={pageRefSize} hotDataRef={hotDataRef} />
    </div>
  );
};

export default FeedbackTable;
