import React from "react";
import { Link } from "react-router-dom";

const ProjectCellSimple = ({ border }) => {
  const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
  return (
    <div className={`w-full p-6 bg-white`}>
      <div className="flex justify-between">
        <Link to={`/jobs/1`}>
          <p className="text-lg font-bold text-green-700 hover:underline cursor-pointer">
            020 커머스 서비스 플랫폼 개발 커머스 서비스 플랫폼 개발
          </p>
        </Link>
      </div>
      <div className="flex space-x-2 mt-2">
        <Tags title="React.js" />
        <Tags title="Javascript" />
        <Tags title="front-end" />
        <Tags title="backend" />
        <Tags title="aws" />
      </div>

      <div className="w-full bg-gray-100 mt-3 rounded flex flex-col overflow-hidden">
        <div className="w-full py-1 px-4 border-r flex items-center text-sm border-white border-2">
          예상비용 4,000 만원
        </div>
        <div className="w-full py-1 px-4 border-r flex items-center text-sm border-white border-2">
          예상기간 120일
        </div>
        <div className="w-full py-1 px-4 flex items-center text-sm border-white border-2">마감일정 D-4</div>
      </div>
    </div>
  );
};

export default ProjectCellSimple;
