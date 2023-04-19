import React from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

import Sample1 from "../assets/sample/1.png";
import { SampleObejectKr, SampleObject } from "../sampleObjects";

const DeveloperProfile = () => {
  const { t, i18n } = useTranslation("developerProfile");

  const SAMPLE = i18n.language.includes("en") ? SampleObject : SampleObejectKr;
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
      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
        <img src={Sample1} alt="" className="object-cover w-full h-full" />
      </div>

      <p className="text-xl">{SAMPLE.name}</p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">{SAMPLE.title}</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          {SAMPLE.company}
        </p>
      </div>
      <p
        style={{
          width: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          // WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
        className="text-xs break-keep text-center text-gray-500"
      >
        {SAMPLE.oneLiner}
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("programming_lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {SAMPLE.tech.map((item) => (
            <Tags size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {SAMPLE.lang.map((item) => (
            <Tags size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell
            value={t("status1.value")}
            title={t("status1.title")}
            icon={<MdOutlineWork />}
          />
          <SummaryCell
            value={t("status2.value")}
            title={t("status2.title")}
            icon={<IoLocationSharp />}
          />
          <SummaryCell
            value={t("status3.value")}
            title={t("status3.title")}
            icon={<AiTwotoneCalendar />}
          />
          <SummaryCell
            value={t("status4.value")}
            title={t("status4.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell
            value={t("status5.value")}
            title={t("status5.title")}
            icon={<BiTime />}
          />
        </div>
      </div>

      <Divider />
    </div>
  );

  const RightPanel = () => {
    const CompanyCell = ({ img, title, year, period }) => (
      <div>
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden">
            <img src={img} alt="" className="object-cover w-full h-full" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{title}</p>
            <p className="text-xs text-gray-500">
              {year} · {period}
            </p>
          </div>
        </div>
      </div>
    );

    const CompanyCell2 = ({ title, year, period, desc }) => (
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
          <p className="text-sm break-keep">{desc}</p>
        </div>
      </div>
    );

    const ProjectCell = ({ name, link, desc }) => (
      <div className="space-y-1">
        <div className="w-full py-1 flex items-center space-x-2">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-600">{name}</p>
          </div>
        </div>
        <p className="text-sm break-keep">{desc}</p>
        <a className="text-sm text-blue-500" href="/developer/profile">
          {link}
        </a>
      </div>
    );

    const EducationCell = ({ name, title, from, to, desc }) => (
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-600">
          {name} | {title}
        </p>
        <p className="text-xs text-gray-500">
          {from} ~ {to}
        </p>
        <p className="text-sm break-keep py-2">{desc}</p>
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
        <TitleText text={t("intro")} />
        <p className="break-keep text-sm">{SAMPLE.intro}</p>
        <Divider />

        <TitleText text={t("k_exp")} />

        {SAMPLE.k_experience.map((item) => (
          <CompanyCell
            img={item.logo}
            period={`${item.from} ~ ${item.to}`}
            year="8개월"
            title={`${item.company} | ${item.title}`}
          />
        ))}

        <Divider />

        <TitleText text={t("exp")} />

        {SAMPLE.experience.map((item) => (
          <CompanyCell2
            period={`${item.from} ~ ${item.to}`}
            year="8개월"
            title={`${item.company} | ${item.title}`}
            desc={item.desc}
          />
        ))}

        <Divider />
        <TitleText text={t("projects")} />

        {SAMPLE.projects.map((item) => (
          <ProjectCell name={item.name} link={item.link} desc={item.desc} />
        ))}

        <Divider />
        <TitleText text={t("education")} />

        {SAMPLE.education.map((item) => (
          <EducationCell
            name={item.name}
            title={item.title}
            from={item.from}
            to={item.to}
            desc={item.desc}
          />
        ))}
        <Divider />
        <TitleText text={t("certificates")} />
        <CertificateCell time={"2021.01.12"} />

        <Divider />
        <div className="h-16" />
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
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
