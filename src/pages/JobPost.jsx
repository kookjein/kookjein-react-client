import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DefaultImage from "../assets/default-profile.png";
import Drawer from "react-modern-drawer";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineFile } from "react-icons/ai";
import ProjectCell from "../components/ProjectCell";
import ComposeJob from "../components/ComposeJob";

const JobPost = () => {
  const { jobId } = useParams();
  const developerInfo = useRef({});
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [composeModalIsOpen, setComposeModalOpen] = useState(false);

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

  const CandidateCell = () => (
    <div className="w-full ring-1 ring-gray-200 rounded-sm overflow-hidden hover:shadow filter transition h-56 items-center p-4 bg-white ">
      <button className="flex items-center hover:text-green-700 cursor-pointer w-full">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = DefaultImage;
          }}
          src={DefaultImage}
          alt=""
          draggable={false}
          style={{ aspectRatio: 1 }}
          className="h-12 w-12 rounded-full border bg-gray-100"
        />
        <div className="ml-4 w-full flex flex-col text-left">
          <p className="font-bold text-lg">Andrew Jang</p>
          <p className="text-xs">Title/Position</p>
        </div>
      </button>
      <div className="flex items-center mt-3">
        <div className="bg-purple-100 rounded-full py-0.5 px-2">
          <p style={{ fontSize: "10px" }} className="text-xs text-purple-600">
            개발자 제안 3,000만원 / 90일
          </p>
        </div>
      </div>

      <p style={{ fontSize: "11px" }} className="text-xs line-clamp-3 mt-3 text-gray-500 w-full text-left break-keep">
        나는 최신 기술을 사용하여 현대적이고 절삭적인 웹 애플리케이션을 만드는 데 깊은 열정을 가진 활기차고 다재다능한
        풀스택 웹 개발자입니다. 이제까지 다양한 팀에서 일해 본 경험은 다양한 업무 환경에 대한 적응력을 향상시켰습니다.
        각각의 프로젝트에서 긍정적인 태도로 일에 임하며 다른 사람들로부터 배울 수 있는 것을 즐기고 가능한 한 내 지식을
        공유하려 합니다. 영업을 확장하고 새로운 도전에 대해 받아들이며 지속적인 자기 개선의 여정을 추구하는 기회를
        지속적으로 찾고 있습니다. 최고의 품질을 유지하고 능력의 한계를 넓히도록 노력함으로써 최종적인 목표를 달성하기를
        바랍니다.
      </p>
      <div className="flex space-x-3 mt-4">
        <button onClick={openComposeModal} className="w-full h-9 rounded text-xs font-bold border hover:bg-gray-50 border-gray-300">
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
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100 pb-12">
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} direction="right" size={450}>
        <div className="w-full h-16 border-b flex items-center justify-between px-6">
          <p className="text-gray-700 font-bold">프로젝트 지원</p>
          <button onClick={toggleDrawer}>
            <RxCross2 className="w-7 h-7" />
          </button>
        </div>
        <ProjectCell small />

        <div className="px-6">
          <Title title="프로젝트 예산 제안" subtitle="프로젝트에 지출 가능한 예산을 선택해 주세요." />
          <div className="flex items-center mt-4 space-x-3">
            <p className="text-gray-700">₩</p>
            <input
              placeholder={"숫자만 기입. 예시) 300"}
              className="w-full h-10 rounded-lg border outline-green-600 px-3"
              type="number"
              maxLength={3}
            />
          </div>
          <Title title="프로젝트 진행 기간 제안" subtitle="프로젝트 예상 진행 기간을 선택해 주세요." />
          <div className="flex items-center mt-4 space-x-3">
            <input
              placeholder={"숫자만 기입. 예시) 3"}
              className="w-54 h-10 rounded-lg border outline-green-600 px-3"
              type="number"
              maxLength={3}
            />
            <p className="text-gray-700">개월</p>
          </div>
          <button className="h-10 w-full mt-12 bg-green-700 text-white rounded hover:brightness-125 font-bold">
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
            <p className="text-xl font-bold text-gray-700 tracking-tight">020 커머스 서비스 플랫폼 개발 {jobId}</p>
            <p className="text-xs text-gray-500 mt-2 tracking-tight">마감일정 D-4 - 등록시간: 1시간 전</p>

            <div className="py-6 border-t mt-8">
              <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 개발 언어 및 환경</p>
              <div className="flex space-x-2">
                <Tags title="React.js" />
                <Tags title="Javascript" />
                <Tags title="front-end" />
                <Tags title="backend" />
                <Tags title="aws" />
              </div>
            </div>

            <div className="py-6 border-t">
              <SummaryCell title="프로젝트 방식" value="단기 프로젝트" />
              <SummaryCell title="프로젝트 예산" value="500만원 ~ 1,000만원" />
              <SummaryCell title="예상 진행 기간" value="3개월" />
              <SummaryCell title="희망 착수일" value="2023년 8월 21일" />

              <SummaryCell title="프로젝트 분류" value="신규 개발" />
              <SummaryCell title="프로젝트 카테고리" value="웹사이트" />
              <SummaryCell title="현재 프로젝트 단계" value="아이디어 단계, 기획된 문서가 있습니다." />
            </div>

            {true && (
              <div className="py-6 border-t">
                <p className="text-gray-600 font-bold tracking-tight mb-6">지원자 - 3</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <CandidateCell />
                  <CandidateCell />
                  <CandidateCell />
                </div>
              </div>
            )}

            <div className="py-6 border-t">
              <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 자료</p>
              <button className="w-1/2 h-10 mt-4 border rounded-lg border-1 flex items-center justify-between px-4 text-sm hover:bg-gray-100 transition">
                <div className="flex items-center space-x-2">
                  <AiOutlineFile />
                  <p>FILE_NAME</p>
                </div>
              </button>
            </div>

            <div className="py-6 border-t">
              <p className="text-gray-600 font-bold tracking-tight mb-6">프로젝트 상세</p>
              <div style={{ whiteSpace: "pre-line" }} className="text-sm mt-3 w-full">
                {`※ 프로젝트의 진행 방식 \n
                - 최초 온라인 인터뷰 
                - 계약 방식 : 기간제 계약 
                - 근무 형태 : 주 5회 풀상주 
                - 근무지 : 서울특별시, 영등포구 
                - 근무기간 : 6개월 ~ 1년 :: 협의 가능 
                - 근무시간 : 오전 9시 ~ 오후 6시
                - 희망 근무 시작일 : 8월 1째주 이내 (ASAP)\n 
                - 개인장비 지참가능합니다. 필요 시 지원가능합니다. 
                - 연차 협의 가능합니다. + 필요인력 및 월급여 
                - front-end | 중고급(6년 차 이 개인장비 지참가능합니다. 필요 시
                지원가능합니다. 
                - 연차 협의 가능합니다. + 필요인력 및 월급여 - front-end프로젝트의 진행 방식 - 최초
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
              <Link to="/contract?flow=1">
                <button className="w-full h-10 bg-green-700 rounded text-white text-sm hover:brightness-110 font-bold mt-2">
                  계약 및 관리 페이지
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
  );
};

export default JobPost;
