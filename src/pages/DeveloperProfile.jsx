import React from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";

const DeveloperProfile = () => {
  const Divider = () => (
    <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />
  );

  const TitleText = ({ text }) => (
    <p style={{ color: "#0E5034" }} className="text-sm font-bold text-gray-400">
      {text}
    </p>
  );

  const SummaryCell = ({ icon, title, value }) => (
    <div className="w-full flex justify-between">
      <div className="space-x-2 flex items-center">
        <div className="text-gray-400 text-sm">{icon}</div>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
      <p className="text-sm font-bold text-gray-500">{value}</p>
    </div>
  );

  const LeftPanel = () => (
    <div
      style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0"
    >
      <div className="w-36 h-36 bg-gray-100 rounded-full"></div>

      <p className="text-xl">Mohammad Algazali</p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">풀스택 개발자</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          남산컴퍼니
        </p>
      </div>
      <p
        style={{
          width: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
        className="text-sm break-keep text-center text-gray-500"
      >
        (한줄소개) 풀스택 소프트웨어 엔지니어로서 저는 강력한 문제 해결 능력.
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text="프로그래밍 언어" />
        <div className="w-full space-x-2 flex flex-wrap">
          <Tags size={"sm"} item={"React.js"} />
          <Tags size={"sm"} item={"Node.js"} />
          <Tags size={"sm"} item={"html"} />
          <Tags size={"sm"} item={"css"} />
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text="소통 언어" />
        <div className="w-full space-x-2 flex flex-wrap">
          <Tags size={"sm"} item={"영어"} />
          <Tags size={"sm"} item={"팔레스타인어"} />
          <Tags size={"sm"} item={"한국어"} />
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell
            value="채용 전"
            title="재직 상태"
            icon={<MdOutlineWork />}
          />
          <SummaryCell
            value="팔레스타인"
            title="국적"
            icon={<IoLocationSharp />}
          />
          <SummaryCell
            value="4년"
            title="업무 연차"
            icon={<AiTwotoneCalendar />}
          />
          <SummaryCell
            value="187만원"
            title="월급"
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell
            value="2023.01.23"
            title="국제인 등록"
            icon={<BiTime />}
          />
        </div>
      </div>

      <Divider />
    </div>
  );

  const RightPanel = () => {
    const testArray = [
      "웹사이트, 광고 캠페인 및 마케팅 자료 등 다양한 매체를 위한 시각 디자인과 그래픽 작업을 수행합니다.",
      "프로그래밍 언어와 기술을 사용하여 컴퓨터 소프트웨어 프로그램을 개발하고 유지보수합니다.",
      "고객의 요구 사항을 파악하고 해결책을 제공하여 제품과 서비스를 판매합니다.",
      "문의 사항에 대한 고객 지원을 제공하고 제품 또는 서비스에 대한 지원을 수행합니다.",
      "재무 기록을 관리하고 보고서를 작성하며 회계 원칙과 규정을 준수합니다.",
    ];

    const CompanyCell = ({ title, year, period }) => (
      <div>
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">
              {year} · {period}
            </p>
          </div>
        </div>
        <div className="my-3 space-y-2">
          {testArray.map((item) => (
            <p className="text-sm break-keep ml-10" key={item}>
              • {item}
            </p>
          ))}
        </div>
      </div>
    );

    const CompanyCell2 = ({ title, year, period }) => (
      <div>
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">
              {year} · {period}
            </p>
          </div>
        </div>
        <div className="my-3">
          <p className="text-sm break-keep">
            웹사이트, 광고 캠페인 및 마케팅 자료 등 다양한 매체를 위한 시각
            디자인과 그래픽 작업을 수행합니다. 프로그래밍 언어와 기술을 사용하여
            컴퓨터 소프트웨어 프로그램을 개발하고 유지보수합니다.고객의 요구
            사항을 파악하고 해결책을 제공하여 제품과 서비스를 판매합니다.고객의
            요구 사항을 파악하고 해결책을 제공하여 제품과 서비스를 판매합니다.
            문의 사항에 대한 고객 지원을 제공하고 제품 또는 서비스에 대한 지원을
            수행합니다.
          </p>
        </div>
      </div>
    );

    const ProjectCell = ({ title }) => (
      <div className="space-y-1">
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
          </div>
        </div>
        <p className="text-sm break-keep">
          웹사이트, 광고 캠페인 및 마케팅 자료 등 다양한 매체를 위한 시각
          디자인과 그래픽 작업을 수행합니다. 웹사이트, 광고 캠페인 및 마케팅
          자료 등 다양한 매체를 위한 시각 디자인과 그래픽 작업을 수행합니다.
        </p>
        <a className="text-sm text-blue-500" href="/developer/profile">
          https://www.namsancompany.com
        </a>
      </div>
    );

    const EducationCell = ({ title, from, to }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">
          The Islamic University of Gaza
        </p>
        <p className="text-xs text-gray-500">
          {from} ~ {to}
        </p>
        <p className="text-sm break-keep py-2">
          Bachelor of Engineering (BEng), Computer engineering
        </p>
      </div>
    );

    const CertificateCell = ({ time }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">AWS Certificate</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    );

    return (
      <div
        style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
        className="w-full flex h-full flex-col p-8 space-y-6 px-12"
      >
        <TitleText text="소개" />
        <p className="break-keep">
          열정적인 풀스택 엔지니어로 6년의 전문 경력을 갖고 있으며 기업과
          스타트업 프로젝트에 참여한 경험이 있습니다. 현재 sellenvo 회사에서
          풀스택 개발자로 일하고 있으며, 최근에는 작은 개발팀을 이끌어 회사의
          프로덕션 앱을 성공적으로 개발했습니다.
        </p>
        <Divider />

        <TitleText text="국제인 인증 경력" />

        <CompanyCell
          period={"2023.01 ~ 현채"}
          year="12개월"
          title={"(주)남산컴퍼니"}
        />
        <CompanyCell
          period={"2021.01 ~ 2022.12"}
          year="21개월"
          title={"(주)푸르모디티"}
        />
        <Divider />

        <TitleText text="외부 경력" />
        <CompanyCell2
          period={"2021.01 ~ 2022.12"}
          year="8개월"
          title={"(주)픽톨로지"}
        />
        <Divider />
        <TitleText text="포트폴리오" />

        <ProjectCell title={"Sellenvo app"} />
        <ProjectCell title={"Sellenvo app"} />

        <Divider />
        <TitleText text="학력" />
        <EducationCell from={"2007.11"} to={"2012.01"} />
        <EducationCell from={"2007.11"} to={"2012.01"} />

        <Divider />
        <TitleText text="자격증" />
        <CertificateCell time={"2021.01.12"} />

        <Divider />
        <div className="h-16" />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
        <LeftPanel />
        <RightPanel />
      </div>
      <Footer />
    </div>
  );
};

export default DeveloperProfile;
