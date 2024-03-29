import React, {useContext, useEffect, useRef, useState} from "react";
import { Link, useParams } from "react-router-dom";
import DefaultImage from "../assets/default-profile.png";
import Drawer from "react-modern-drawer";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineFile } from "react-icons/ai";
import ProjectCell from "../components/ProjectCell";
import ComposeJob from "../components/ComposeJob";
import axios from "../utils/authAxios";
import { useTranslation } from "react-i18next";
import moment from "moment/moment";
import {AuthContext} from "../context/authContext";

const JobPost = () => {
  const { jobId } = useParams();
  const developerInfo = useRef({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [composeModalIsOpen, setComposeModalOpen] = useState(false);
  const [project, setProject] = useState(null);
  const budgetInputRef = useRef(null);
  const durationInputRef = useRef(null);
  const { i18n } = useTranslation("profile");
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const { userState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`v1/project/`, { params: { project_id: jobId } }).then((response) => {
      setProject(response.data);
    });
  }, [jobId]);

  const Tags = ({ title }) => (
    <div className="text-xs px-3 py-1 rounded-full bg-green-800 bg-opacity-10 text-green-800 hover:bg-opacity-20 cursor-pointer">
      {title}
    </div>
  );

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const SummaryCell = ({ title, value }) => (
    <div className="flex text-sm py-2 flex-items-center">
      <p className="w-48 text-gray-500 tracking-tight">• {title}</p>
      <p>{value}</p>
    </div>
  );

  const CandidateCell = ({ user }) => (
    <div className="w-full ring-1 ring-gray-200 rounded-sm overflow-hidden hover:shadow filter transition h-56 items-center p-4 bg-white ">
      <button className="flex items-center hover:text-green-700 cursor-pointer w-full">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = DefaultImage;
          }}
          src={DefaultImage}
          alt={user[1][0].name[lang]}
          draggable={false}
          style={{ aspectRatio: 1 }}
          className="h-12 w-12 rounded-full border bg-gray-100"
        />
        <div className="ml-4 w-full flex flex-col text-left">
          <p className="font-bold text-lg">{user[1][0].name[lang]}</p>
          <p className="text-xs">{user[1][0].oneLiner?.[lang]}</p>
        </div>
      </button>
      <div className="flex items-center mt-3">
        <div className="bg-purple-100 rounded-full py-0.5 px-2">
          <p style={{ fontSize: "10px" }} className="text-xs text-purple-600">
            {`개발자 제안 ${user[2][0].budget}원 / ${user[2][0].duration}일`}
          </p>
        </div>
      </div>

      <p style={{ fontSize: "11px" }} className="text-xs line-clamp-3 mt-3 text-gray-500 w-full text-left break-keep">
        {user[1][0].description?.[lang]}
      </p>
      <div className="flex space-x-3 mt-4" style={{display: project.user_id === userState.user.userId ? '' : 'none'}}>
        <button
          onClick={openComposeModal}
          className="w-full h-9 rounded text-xs font-bold border hover:bg-gray-50 border-gray-300"
        >
          메세지 보내기
        </button>
        <Link to="/contract?flow=1" className="w-full">
          <button className="w-full h-9 border border-green-700 text-green-700 rounded text-xs font-bold hover:bg-gray-50">
            채용하기
          </button>
        </Link>
      </div>
    </div>
  );

  const Title = ({ title, subtitle }) => (
    <>
      <div className="flex space-x-2 mt-8">
        <h1 className="font-bold text-lg text-gray-700">{title}</h1>
        <h1 className="font-bold text-lg text-red-500">*</h1>
      </div>
      <p className="text-gray-600 text-xs mt-2">{subtitle}</p>
    </>
  );

  function openComposeModal() {
    setComposeModalOpen(true);
  }

  function closeComposeModal() {
    setComposeModalOpen(false);
  }

  return (
    project && (
      <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100 pb-12">
        <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={450}>
          <div className="w-full h-16 border-b flex items-center justify-between px-6">
            <p className="text-gray-700 font-bold">프로젝트 지원</p>
            <button onClick={toggleDrawer}>
              <RxCross2 className="w-7 h-7" />
            </button>
          </div>

          <ProjectCell project={project} />

          <div className="px-6">
            <Title title="프로젝트 예산 제안" subtitle="프로젝트에 지출 가능한 예산을 선택해 주세요." />
            <div className="flex items-center mt-4 space-x-3">
              <p className="text-gray-700">₩</p>
              <input
                ref={budgetInputRef}
                placeholder={"숫자만 기입. 예시) 300"}
                className="w-full h-10 rounded-lg border outline-green-600 px-3"
                type="number"
                maxLength={3}
              />
            </div>
            <Title title="프로젝트 진행 기간 제안" subtitle="프로젝트 예상 진행 기간을 선택해 주세요." />
            <div className="flex items-center mt-4 space-x-3">
              <input
                ref={durationInputRef}
                placeholder={"숫자만 기입. 예시) 3"}
                className="w-54 h-10 rounded-lg border outline-green-600 px-3"
                type="number"
                maxLength={3}
              />
              <p className="text-gray-700">개월</p>
            </div>
            <button
              className="h-10 w-full mt-12 bg-green-700 text-white rounded hover:brightness-125 font-bold"
              onClick={() => {
                if (budgetInputRef.current.value && durationInputRef.current.value) {
                  axios
                    .post("v1/project/apply", {
                      project_id: project.project_id,
                      project_proposal: [
                        {
                          budget: budgetInputRef.current.value,
                          duration: durationInputRef.current.value,
                        },
                      ],
                    })
                    .then(toggleDrawer)
                    .catch((err) => {});
                }
              }}
            >
              프로젝트 지원
            </button>
          </div>
        </Drawer>

        <ComposeJob
          userId={1}
          openComposeModal={openComposeModal}
          closeComposeModal={closeComposeModal}
          composeModalIsOpen={composeModalIsOpen}
          developerInfo={developerInfo}
        />
        <div
          style={{ maxWidth: "1260px", scrollbarWidth: 0 }}
          className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-6"
        >
          <div className="w-full h-full my-8 flex border bg-white rounded-xl shadow-lg overflow-hidden pb-12">
            {/* LEFT PANEL */}
            <div className="w-full p-8 bg-white border-r">
              <p className="text-xl font-bold text-gray-700 tracking-tight">{project.project_info[0].title[lang]}</p>
              <p className="text-xs text-gray-500 mt-2 tracking-tight">
                마감일정 D - {moment(project.project_info[0].start_at).diff(moment(new Date()), "days")}
              </p>

              <div className="py-6 border-t mt-8">
                <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 개발 언어 및 환경</p>
                <div className="flex space-x-2">
                  {project.project_info[0].tech.map((value) => (
                    <Tags key={value.id} title={value.text} />
                  ))}
                </div>
              </div>

              <div className="py-6 border-t">
                <SummaryCell
                  title="프로젝트 방식"
                  value={project.project_info[0].method === "contract" ? "단기 프로젝트" : "인력 구인"}
                />
                <SummaryCell title="프로젝트 예산" value={project.project_info[0].budget.label} />
                <SummaryCell title="예상 진행 기간" value={`${project.project_info[0].duration}개월`} />
                <SummaryCell title="희망 착수일" value={project.project_info[0].start_at} />

                <SummaryCell
                  title="프로젝트 분류"
                  value={project.project_info[0].type === "new" ? "신규 프로젝트" : "유지 보수"}
                />
                <SummaryCell
                  title="프로젝트 카테고리"
                  value={project.project_info[0].category
                    .map((value) => {
                      return value === "web" ? "웹사이트" : value === "mobile" ? "모바일 앱" : "기타 소프트웨어";
                    })
                    .join(", ")}
                />
                <SummaryCell
                  title="현재 프로젝트 단계"
                  value={project.project_info[0].status
                    .map((value) => {
                      return value === 0
                        ? "아이디어 단계"
                        : value === 1
                        ? "기획된 문서가 있습니다"
                        : value === 2
                        ? "디자인이 있습니다"
                        : "MVP가 있습니다";
                    })
                    .join(", ")}
                />
              </div>

              {true && (
                <div className="py-6 border-t">
                  <p className="text-gray-600 font-bold tracking-tight mb-6">
                    지원자 - {project.applicants.filter((value) => JSON.parse(value)[0]).length}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {project.applicants?.map((value, index) => {
                      const user = JSON.parse(value);
                      return user[0] && <CandidateCell key={index} user={user} />;
                    })}
                  </div>
                </div>
              )}

              <div className="py-6 border-t">
                <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 자료</p>
                {project.project_info[0].files?.map((value, index) => {
                  return (
                    <button
                      className="w-1/2 h-10 mt-4 border rounded-lg border-1 flex items-center justify-between px-4 text-sm hover:bg-gray-100 transition"
                      key={index}
                    >
                      <div className="flex items-center space-x-2">
                        <AiOutlineFile />
                        <p>{value.split("/").slice(-1)[0]}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="py-6 border-t">
                <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 상세</p>
                <div style={{ whiteSpace: "pre-line" }} className="text-sm mt-3 w-full">
                  {project.project_info[0].detail[lang]}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-80 h-full p-8 flex-shrink-0 overflow-hidden">
              <p className="text-purple-600 font-bold tracking-tight mb-4">상태: 구인중 / 계약완료</p>
              <>
                <button
                  onClick={() => toggleDrawer()}
                  className="w-full h-10 bg-green-700 rounded text-white text-sm hover:brightness-110 font-bold"
                >
                  Apply Now
                </button>
                <button
                  onClick={() => toggleDrawer()}
                  className="w-full h-10 bg-gray-300 text-gray-400 rounded text-sm font-bold mt-2"
                >
                  Applied
                </button>
                <Link to="/manage">
                  <button className="w-full h-10 bg-green-700 rounded text-white text-sm hover:brightness-110 font-bold mt-2">
                    관리 페이지
                  </button>
                </Link>
              </>

              <div className="py-4 border-t mt-6">
                <p className="text-gray-600 font-bold tracking-tight mb-6">클라이언트 정보</p>
                <div className="space-y-2 text-gray-600 font-bold text-xs">
                  <div className="flex space-x-2 items-center">
                    <p className="w-28">담당자명</p>
                    <p>김준석</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p className="w-28">직책</p>
                    <p>CTO</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p className="w-28">회사명</p>
                    <p>company_name</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p className="w-28">등록된 프로젝트</p>
                    <p>2</p>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <p className="w-28">계약 완료 수</p>
                    <p>1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default JobPost;
