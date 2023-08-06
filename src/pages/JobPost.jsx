import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultImage from "../assets/default-profile.png";
import Drawer from "react-modern-drawer";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineFile } from "react-icons/ai";
import { AuthContext } from "../context/authContext";

const JobPost = () => {
  const { jobId } = useParams();
  const { userState } = useContext(AuthContext);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;

  const toggleDrawer = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const SummaryCell = ({ title, value }) => (
    <div className="flex text-sm h-7 flex-items-center">
      <p className="w-48 text-gray-500">{title}</p>
      <p>{value}</p>
    </div>
  );

  const ProjectCell = () => {
    const Tags = ({ title }) => <div className="text-xs px-2 border py-1 rounded">{title}</div>;
    return (
      <div className="w-full py-4 border cursor-default bg-white rounded p-4">
        <div className="flex justify-between">
          <p className="text-lg font-bold text-green-700">020 커머스 서비스 플랫폼 개발</p>
        </div>
        <div className="flex space-x-2 mt-2">
          <Tags title="React.js" />
          <Tags title="Javascript" />
          <Tags title="front-end" />
          <Tags title="backend" />
          <Tags title="aws" />
        </div>

        <div className="w-full h-10 bg-gray-100 mt-3 rounded flex overflow-hidden">
          <div className="w-1/4 border-r flex items-center justify-center text-xs border-white bg-gray-100 border-2">
            예상비용 4,000 만원
          </div>
          <div className="w-1/4 border-r flex items-center justify-center text-xs border-white bg-gray-100 border-2">
            예상기간 120일
          </div>
          <div className="w-1/4 flex items-center justify-center text-xs border-white bg-gray-100 border-2">
            마감일정 D-4
          </div>
          <div className="w-1/4 flex items-center justify-center text-sm border-white border-2">지원자 0</div>
        </div>
      </div>
    );
  };

  const CandidateCell = () => (
    <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center px-4">
      <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
      <p className="mt-4 font-bold">Andrew Jang</p>
      <p className="text-sm text-gray-600">Title/Position</p>

      <div className="w-full h-10 text-sm flex items-center justify-center font-bold text-green-700">개발자 제안</div>
      <div className="w-full text-sm flex items-center justify-center">3,000만원 / 90일</div>

      <button className="w-full h-9 bg-green-600 mt-4 rounded text-sm text-white hover:brightness-125">
        메세지 보내기
      </button>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={450}>
        <div className="w-full h-16 border-b flex items-center justify-between px-6">
          <p className="text-gray-700">채용 신청</p>
          <button onClick={toggleDrawer}>
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-xl mb-4">지원 프로젝트</p>
          <ProjectCell />

          <p className="text-xl mt-8">인사말/간단한 소개</p>
          <textarea className="w-full h-48 border rounded mt-4 outline-green-600 p-3" />

          <div className="absolute bottom-0 h-24 border-t w-full bg-gray-100 -ml-6 p-4 flex items-center justify-end">
            <button className="h-9 px-6 bg-green-600 text-white rounded hover:brightness-125">메세지 보내기</button>
          </div>
        </div>
      </Drawer>
      <div
        style={{ maxWidth: "1240px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around overflow-x-auto"
      >
        <div className="w-full h-full my-8 flex border bg-white">
          {/* LEFT PANEL */}
          <div className="w-full p-6 bg-white border-r">
            <div className="flex justify-between">
              <Link to={`/jobs/1`}>
                <p className="text-xl font-bold text-green-700 hover:underline cursor-pointer">
                  020 커머스 서비스 플랫폼 개발 {jobId}
                </p>
              </Link>
              <div className="flex space-x-1">
                <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">
                  프로젝트 방식
                </div>
                <div className="h-7 px-2 bg-blue-500 text-white rounded-lg flex items-center text-sm">
                  프로젝트 카테고리
                </div>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Tags title="React.js" />
              <Tags title="Javascript" />
              <Tags title="front-end" />
              <Tags title="backend" />
              <Tags title="aws" />
            </div>

            <div className="w-full h-10 bg-gray-100 mt-3 rounded flex overflow-hidden">
              <div className="w-1/4 border-r flex items-center justify-center text-sm border-white border-2">
                예상비용 4,000 만원
              </div>
              <div className="w-1/4 border-r flex items-center justify-center text-sm border-white border-2">
                예상기간 120일
              </div>
              <div className="w-1/4 flex items-center justify-center text-sm border-white border-2">마감일정 D-4</div>
              <div className="w-1/4 flex items-center justify-center text-sm border-white border-2">지원자 0</div>
            </div>

            <div className="py-8 px-6">
              <SummaryCell title="프로젝트 방식" value="단기 프로젝트" />
              <SummaryCell title="프로젝트 분류" value="신규 개발" />
              <SummaryCell title="프로젝트 카테고리" value="웹사이트" />
              <SummaryCell title="현재 프로젝트 단계" value="아이디어 단계, 기획된 문서가 있습니다." />
              <SummaryCell title="프로젝트 예산" value="500만원 ~ 1,000만원" />
              <SummaryCell title="희망 착수일" value="2023년 8월 21일" />
              <SummaryCell title="예상 진행 기간" value="3개월" />
            </div>

            {true && (
              <div className="w-full mb-12 px-3">
                <p className="text-xl font-bold">지원자 - 3</p>
                <div className="grid grid-cols-4 gap-4 mt-4">
                  <CandidateCell />
                  <CandidateCell />
                  <CandidateCell />
                </div>
              </div>
            )}

            <p className="text-xl px-3">프로젝트 자료</p>
            <div className="px-3 mb-8">
              <button className="w-1/2 h-10 mt-4 border rounded-lg border-1 flex items-center justify-between px-4 text-sm hover:bg-gray-100 transition">
                <div className="flex items-center space-x-2">
                  <AiOutlineFile />
                  <p>FILE_NAME</p>
                </div>
              </button>
            </div>

            <p className="text-xl px-3">프로젝트 상세</p>
            <div className="p-3">
              <div style={{ whiteSpace: "pre-line" }} className="text-sm mt-3 w-full">
                {`※ 프로젝트의 진행 방식 \n
                - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 -
                근무지 : 서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 -
                희망 근무 시작일 : 8월 1째주 이내 (ASAP)\n - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의
                가능합니다. + 필요인력 및 월급여 - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시
                지원가능합니다. - 연차 협의 가능합니다. + 필요인력 및 월급여 - front-end프로젝트의 진행 방식 - 최초
                온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무 형태 : 주 5회 풀상주 - 근무지 : 서울특별시, 영등포구 -
                근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 : 오전 9시 ~ 오후 6시 - 희망 근무 시작일 : 8월 1째주 이내
                (ASAP) - 개인장비 지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다. + 필요인력 및 월급여 -
                front-end | 중고급(6년 차 이 개인장비 지참가능합니다.\n\n 필요 시 지원가능합니다. - 연차 협의 가능합니다. +
                필요인력 및 월급여 - front-end프로젝트의 진행 방식 - 최초 온라인 인터뷰 - 계약 방식 : 기간제 계약 - 근무
                형태 : 주 5회 풀상주 - 근무지 : 서울특별시, 영등포구 - 근무기간 : 6개월 ~ 1년 :: 협의 가능 - 근무시간 :
                오전 9시 ~ 오후 6시 - 희망 근무 시작일 : 8월 1째주 이내 (ASAP) - 개인장비 지참가능합니다. 필요 시
                지원가능합니다. - 연차 협의 가능합니다. + 필요인력 및 월급여 - front-end | 중고급(6년 차 이 개인장비
                지참가능합니다. 필요 시 지원가능합니다. - 연차 협의 가능합니다. + 필요인력 및 월급여 - front-end`}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-80 h-full p-6 flex-shrink-0 overflow-hidden">
            <p className="font-bold mb-4">채용된 직원</p>
            <div className="mb-12">
              <div className="flex items-center space-x-4">
                <img src={DefaultImage} alt="" className="w-14 h-14 rounded-full flex-shrink-0 bg-gray-100" />
                <p>Andrew Jang</p>
              </div>
              <Link to="/manage">
                <button className="flex items-center flex-shrink-0 text-white text-sm w-full bg-green-600 h-10 mt-4 rounded justify-center">
                  계약 및 관리 페이지
                </button>
              </Link>
            </div>

            <p className="font-bold mb-4">프로젝트 오너</p>
            <div className="flex space-x-3 items-center">
              <img src={DefaultImage} alt="" className="w-14 h-14 rounded-full flex-shrink-0 bg-gray-100" />
              <div>
                <p>John Kim</p>
                <div className="flex items-center flex-shrink-0 text-sm">
                  {/* <p className="mr-1 font-bold flex-shrink-0">{developerInfo.current.name?.[lang]} - </p> */}
                  {/* {developerInfo.current?.title?.[lang] && (
                    <p className="text-sm mb-1">{developerInfo.current?.title?.[lang]}</p>
                  )} */}
                  <p>title_</p>
                  <p className="mx-1">at</p>
                  {/* <Link to={`/company/${companyInfo.current.company?.company_id}`}> */}
                  <Link to="/">
                    <button className="text-green-700 hover:underline filter hover:brightness-125 font-bold">
                      company_name
                      {/* {companyInfo.current?.company?.company_info[0]?.name} */}
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-100 rounded mt-4 p-6 space-y-3">
              <div className="flex w-full justify-between text-sm">
                <p className="text-gray-500">등록된 프로젝트</p>
                <p className="font-bold text-green-700">1</p>
              </div>
              <div className="flex w-full justify-between text-sm">
                <p className="text-gray-500">계약 프로젝트</p>
                <p className="font-bold text-green-700">1</p>
              </div>
            </div>

            {!userState.user.userType !== "employer" && (
              <button
                onClick={() => toggleDrawer()}
                className="w-full h-10 bg-green-600 mt-4 rounded text-white text-sm hover:bg-green-500"
              >
                프로젝트 지원
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;