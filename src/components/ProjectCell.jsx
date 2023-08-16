import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import moment from "moment";

const ProjectCell = ({ project }) => {
  const { i18n } = useTranslation("profile");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const Tags = ({ title }) => (
    <div className="text-xs px-3 py-1 rounded-full bg-green-800 bg-opacity-10 text-green-800 hover:bg-opacity-20 cursor-pointer flex-shrink-0">
      {title}
    </div>
  );
  return (
    <Link to={`/jobs/1`}>
      <button className={`p-8 bg-white w-full group hover:bg-green-600 hover:bg-opacity-5`}>
        <p className="text-lg font-bold group-hover:text-green-700 cursor-pointer text-gray-700 w-full text-left">
          {project?.project_info[0].title[lang]}
        </p>

        <div className="flex mt-6 text-green-800 divide-x">
          <div className="text-xs font-bold pr-3">{project?.project_info[0].budget.label}</div>
          <div className="text-xs px-3">
            {project?.project_info[0].method === "contract" ? "단기 프로젝트" : "인력 구인"}
          </div>
          <div className="text-xs px-3">예상기간 {project?.project_info[0].duration}개월</div>
          <div className="text-xs px-3">
            마감일정 D - {moment(new Date()).diff(moment(project?.project_info[0].start_at), 'days')}
          </div>
          <div className="text-xs px-3 text-gray-500">최초 등록: {moment(project?.project_created_at).fromNow()}</div>
        </div>

        <div className="text-xs mt-4 line-clamp-4 tracking-tight w-full text-left break-keep">
          {project?.project_info[0].detail}
        </div>

        <div className="text-xs w-full text-left mt-6 font-bold text-gray-700">지원자: 0</div>

        <div className="flex gap-2 mt-6 flex-wrap">
          {project?.project_info[0].tech.map((value) => (
            <Tags key={value.id} title={value.text} />
          ))}
        </div>
      </button>
    </Link>
  );
};

export default ProjectCell;
