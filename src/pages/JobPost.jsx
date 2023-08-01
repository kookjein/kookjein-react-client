import React from "react";
import { useParams } from "react-router-dom";

const JobPost = () => {
  const { jobId } = useParams();

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto"
      >
        <div className="w-full mt-8 flex border bg-white">
          <div className="w-full"></div>
          <div className="w-64 h-full border-l pb-8 flex-shrink-0 overflow-hidden"></div>
        </div>
        {jobId}
      </div>
    </div>
  );
};

export default JobPost;
