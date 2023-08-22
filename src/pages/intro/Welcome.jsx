import React, { useEffect, useRef, useState } from "react";
import Client1 from "../../assets/main/client1.png";
import Client2 from "../../assets/main/client2.png";
import Client3 from "../../assets/main/client3.png";
import Client4 from "../../assets/main/client4.png";
import Client5 from "../../assets/main/client5.png";
import FourthType1 from "../../assets/main/type1.png";
import FourthType2 from "../../assets/main/type2.png";
import FourthType3 from "../../assets/main/type3.png";
import FourthType4 from "../../assets/main/type4.png";
import FourthType5 from "../../assets/main/type5.png";
import FourthType6 from "../../assets/main/type6.png";
import Process1 from "../../assets/main/process1.png";
import Process2 from "../../assets/main/process2.png";
import Process3 from "../../assets/main/process3.png";
import Process4 from "../../assets/main/process4.png";
import LeftArrow from "../../assets/main/left_arrow.png";
import RightArrow from "../../assets/main/right_arrow.png";
import Checkmark from "../../assets/main/checkmark.png";
import TechStack from "../../assets/main/techstack.png";
import Assistant1 from "../../assets/main/assistant1.png";
import Assistant2 from "../../assets/main/assistant2.png";
import Partner1 from "../../assets/main/partner1.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import axios from "../../utils/authAxios";
import CompanyCard from "../../components/CompanyCard";
import { TypeAnimation } from "react-type-animation";
import ProfileCard from "../../components/ProfileCard";
import "../../utils/slideAnimation.css";

const Welcome = () => {
  const { t } = useTranslation("welcome");
  const scrollRef = useRef(null);
  const [companyArray, setCompanyArray] = useState([]);
  const [employeeArray, setEmployeeArray] = useState({});

  const scrollToAssistant = () => scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  useEffect(() => {
    axios
      .get(`/v1/company/all`)
      .then((response) => {
        setCompanyArray(response.data);
      })
      .catch((e) => {});

    axios
      .get(`/v1/user/employees`)
      .then((response) => {
        setEmployeeArray(response.data);
      })
      .catch((e) => {});

    return () => {};
  }, []);

  const WelcomeSection = () => {
    return (
      <div
        style={{ background: "linear-gradient(180deg, #16653420, #ffffff)" }}
        className={`flex h-full items-center flex-col sm:flex-row z-20 w-screen relative justify-center transition`}
      >
        <div style={{ maxWidth: "1280px" }} className="w-full relative h-full px-4 flex flex-col items-center pt-24">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              t("type.1"),
              3000, // wait 1s before replacing "Mice" with "Hamsters"
              t("type.2"),
              3000,
              t("type.3"),
              3000,
              t("type.4"),
              3000,
              t("type.5"),
              3000,
              t("type.6"),
              3000,
              t("type.7"),
              3000,
            ]}
            wrapper="span"
            speed={25}
            repeat={Infinity}
            className="font-bold tracking-tight sm:text-6xl text-3xl text-center"
          />
          <p className="font-bold leading-relaxed sm:leading-relaxed sm:text-6xl text-3xl">{t("type.fixed")}</p>
          <h2
            style={{ whiteSpace: "pre-line" }}
            className="mt-8 text-md sm:text-xl text-gray-600 tracking-tight text-center leading-9 sm:leading-9 sm:max-w-md 2xl:max-w-lg break-keep"
          >
            {t("subtitle")}
          </h2>

          <div className="w-full flex sm:flex-row flex-col justify-center sm:space-y-0 space-y-4 sm:space-x-4 mt-8 tracking-tight">
            <Link to="/post-job/flow-1" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto text-white text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold bg-green-700">
                {t("create")}
              </button>
            </Link>
            <button
              onClick={scrollToAssistant}
              className="bg-white text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold text-gray-700 border hover:bg-gray-100"
            >
              {t("problem")}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const HeroSection = () => (
    <div
      className={`flex h-full items-center flex-col sm:flex-row z-20 w-screen relative justify-center transition mt-12`}
    >
      <div style={{ maxWidth: "1280px" }} className="w-full relative h-full px-4 flex flex-col items-center">
        <div className="mt-24 w-full sm:mb-12 mb-24">
          <p className="font-bold tracking-tight mb-6 text-lg text-green-600">{t("best")}</p>
          <div className="w-full flex sm:flex-row flex-col justify-around sm:space-x-4 space-y-4 sm:space-y-0">
            {Object.entries(employeeArray)
              .filter((item, idx) => item[1].user_img)
              .filter(
                (item, idx) =>
                  item[1].user_id === 6 || item[1].user_id === 8 || item[1].user_id === 10 || item[1].user_id === 12
              )
              .map((item, index) => (
                <ProfileCard key={index} item={item} isEmployer={false} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ClientSection = () => (
    <div className="flex flex-col items-center py-12">
      <p className="font-semibold text-gray-600 text-center text-sm sm:text-base">{t("trust")}</p>
      <div className="py-16 w-screen flex sm:flex-row flex-col items-center justify-center space-y-12 sm:space-y-0 sm:space-x-16 z-20">
        <img draggable={false} src={Client5} className="object-contain h-7" alt="" />
        <img draggable={false} src={Client3} className="object-contain h-10" alt="" />
        <img draggable={false} src={Client2} className="object-contain h-6" alt="" />
        <img draggable={false} src={Client4} className="object-contain h-7" alt="" />
        <img draggable={false} src={Partner1} className="object-contain h-12" alt="" />
        <img src={Client1} draggable={false} className="object-contain h-8" alt="" />
      </div>
    </div>
  );

  const DeveloperSection = () => (
    <div className="flex w-screen items-center justify-center sm:flex-row flex-col py-24 bg-green-800 bg-opacity-5">
      <div style={{ maxWidth: "1280px" }} className="flex sm:flex-row flex-col items-center px-6 sm:space-x-8 w-full">
        <img
          src={TechStack}
          alt=""
          className="w-full -ml-12 max-w-3xl hidden sm:flex object-contain"
          draggable={false}
        />
        <div className="flex flex-col tracking-tight w-full">
          <p className="font-bold tracking-tight mb-6 text-lg text-green-600">{t("second.subtitle")}</p>
          <p className="text-2xl sm:text-4xl font-bold">{t("second.title1")}</p>
          <p className="text-2xl sm:text-4xl font-bold mt-2">{t("second.title2")}</p>
          <p className="mt-8 break-keep">
            {t("second.body1")} {t("second.body2")} {t("second.body3")} {t("second.body4")}
          </p>

          <Link to="/browse">
            <button className="text-blue-500 mt-12 text-lg hover:underline">{t("second.find")}</button>
          </Link>
          <div className="w-full h-px bg-gray-300 my-8" />
          <div>
            <p className="text-lg sm:text-xl font-bold break-keep">
              {t("third.title1")} {t("third.title2")}
            </p>
            <p className="mt-8">{t("third.body1")}</p>
            <p className="">{t("third.body2")}</p>
            <p className="mt-4">{t("third.body3")}</p>
            <p>{t("third.body4")}</p>
            <p className="mt-4">{t("third.body5")}</p>
            <p>{t("third.body6")}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const AssistantSection = () => (
    <div ref={scrollRef} className="flex w-screen items-center justify-center sm:flex-row flex-col py-24">
      <div style={{ maxWidth: "1280px" }} className="flex sm:flex-row flex-col items-center px-6 sm:space-x-8 w-full">
        <div className="flex flex-col tracking-tight w-full">
          <p className="font-bold tracking-tight mb-6 text-lg text-green-600">{t("assistant.subtitle")}</p>
          <div className="flex">
            <div className="sm:w-1/2 w-full flex-shrink-0">
              <p className="text-2xl sm:text-4xl font-bold break-keep">{t("assistant.title1")}</p>
              <div className="text-2xl sm:text-4xl font-bold mt-2">
                <p className="inline text-green-600">{t("assistant.free")}</p> {t("assistant.title2")}
              </div>
              <p className="mt-8 break-keep max-w-md">{t("assistant.body1")}</p>
              <p className="mt-4 break-keep text-gray-600">{t("assistant.bullet1")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet2")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet3")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet4")}</p>

              <Link to="/assistant">
                <button className="text-blue-500 mt-12 text-lg hover:underline">{t("assistant.viewMore")}</button>
              </Link>
            </div>
            <img src={Assistant1} alt="" className="w-1/2 hidden sm:flex object-contain pl-12" draggable={false} />
          </div>
          <div className="w-full h-px bg-gray-300 my-8" />

          <div className="flex">
            <div className="sm:w-1/2 w-full flex-shrink-0">
              <div className="text-lg sm:text-2xl font-bold break-keep">
                {t("assistant.title3")} <p className="inline text-green-600">{t("assistant.title4")}</p>
              </div>
              <p className="mt-8 break-keep max-w-md">{t("assistant.body2")}</p>
              <p className="mt-4 break-keep text-gray-600">{t("assistant.bullet5")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet6")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet7")}</p>
              <p className="mt-1 break-keep text-gray-600">{t("assistant.bullet8")}</p>
            </div>
            <img
              src={Assistant2}
              alt=""
              className="w-1/2 max-w-2xl hidden sm:flex object-contain pl-12"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const StrengthSection = () => {
    const Cell = ({ icon, title, text1, text2, dark }) => (
      <div className={`flex flex-col items-center`}>
        <img src={icon} className={`w-16`} alt="" draggable={false} />
        <p className={`${dark && "text-indigo-600"} font-bold mt-4 text-lg`}>{title}</p>
        <p style={{ fontSize: "0.85rem" }} className={`${dark ? "text-gray-500" : "text-gray-500"} text-sm mt-4`}>
          {text1}
        </p>
        <p style={{ fontSize: "0.85rem" }} className={`${dark ? "text-gray-500" : "text-gray-500"} text-sm`}>
          {text2}
        </p>
      </div>
    );
    return (
      <div className="flex w-screen items-center justify-center sm:flex-row flex-col py-24 bg-green-800 bg-opacity-5">
        <div style={{ maxWidth: "1280px" }} className="flex flex-col items-center px-6 w-full">
          <p className="font-bold tracking-tight mb-6 text-lg text-green-600">{t("fourth.subtitle")}</p>
          <p className="text-2xl sm:text-4xl font-bold break-keep max-w-2xl sm:leading-normal text-center">
            {t("fourth.sectionTitle")}
          </p>
          <div className="grid sm:grid-cols-3 grid-cols-1 px-4 gap-16 mt-16">
            <div className="space-y-16 p-6 bg-green-800 bg-opacity-10 rounded-lg">
              <Cell
                icon={FourthType1}
                title={t("fourth.1.title")}
                text1={t("fourth.1.body1")}
                text2={t("fourth.1.body2")}
                dark
              />
              <Cell
                icon={FourthType5}
                title={t("fourth.5.title")}
                text1={t("fourth.5.body1")}
                text2={t("fourth.5.body2")}
                dark
              />
            </div>

            <div className="space-y-16 p-6">
              <Cell
                icon={FourthType2}
                title={t("fourth.2.title")}
                text1={t("fourth.2.body1")}
                text2={t("fourth.2.body2")}
              />
              <Cell
                icon={FourthType3}
                title={t("fourth.3.title")}
                text1={t("fourth.3.body1")}
                text2={t("fourth.3.body2")}
              />
            </div>

            <div className="space-y-16 p-6">
              <Cell
                icon={FourthType4}
                title={t("fourth.4.title")}
                text1={t("fourth.4.body1")}
                text2={t("fourth.4.body2")}
              />
              <Cell
                icon={FourthType6}
                title={t("fourth.6.title")}
                text1={t("fourth.6.body1")}
                text2={t("fourth.6.body2")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProcessSection = () => {
    const [progressIndex, setProgressIndex] = useState(0);
    const progressData = [
      {
        img: Process1,
        step: "Step 1",
        title: t("fifth.1.title"),
        text1: t("fifth.1.text1"),
        text2: t("fifth.1.text2"),
      },
      {
        img: Process2,
        step: "Step 2",
        title: t("fifth.2.title"),
        text1: t("fifth.2.text1"),
        text2: t("fifth.2.text2"),
      },
      {
        img: Process3,
        step: "Step 3",
        title: t("fifth.3.title"),
        text1: t("fifth.3.text1"),
        text2: t("fifth.3.text2"),
      },
      {
        img: Process4,
        step: "Step 4",
        title: t("fifth.4.title"),
        text1: t("fifth.4.text1"),
        text2: t("fifth.4.text2"),
      },
    ];
    const BarCell = ({ title, index }) => (
      <button onClick={() => setProgressIndex(index)} className="flex flex-col items-center w-full group transition">
        <p
          className={`${
            progressIndex !== index ? "text-gray-400 group-hover:text-gray-500" : "text-black font-bold"
          } font-poppins mb-4 sm:text-sm text-xs transition break-keep`}
        >
          {title}
        </p>
        <div
          style={{ backgroundColor: progressIndex >= index && "#1FAD72" }}
          className="w-full h-1 group-hover:bg-gray-300 bg-gray-200 transition"
        ></div>
      </button>
    );
    const IndexCell = () => (
      <div className="flex p-8 w-full">
        <div className="sm:w-1/2 w-full">
          <p style={{ color: "#1FAD72" }} className="font-bold text">
            {progressData[progressIndex].step}
          </p>

          <p className="font-bold text-lg mt-8 break-keep">{progressData[progressIndex].title}</p>

          <div className="mt-8">
            <div className="flex items-start">
              <img src={Checkmark} className="w-3 object-contain" alt="" />
              <p className="text-xs ml-2 break-keep">{progressData[progressIndex].text1}</p>
            </div>
            <div className="flex items-start mt-4">
              <img src={Checkmark} className="w-3 object-contain" alt="" />
              <p className="text-xs ml-2 break-keep">{progressData[progressIndex].text2}</p>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex w-1/2 max-h-72 h-full">
          <img
            src={progressData[progressIndex].img}
            alt=""
            className="w-full h-full hidden sm:flex max-h-72 object-contain"
            draggable={false}
          />
        </div>
      </div>
    );
    return (
      <div
        style={{ background: "linear-gradient(180deg, rgba(22, 101, 52, 0.05 ), #ffffff)" }}
        className="flex w-screen items-center justify-center sm:flex-row flex-col-reverse py-24"
      >
        <div style={{ maxWidth: "1280px" }} className="flex flex-col w-full items-center h-full px-4">
          <p className="text-xl font-bold mb-20 px-4 w-full">{t("fifth.sectionTitle")}</p>

          <div className="flex max-w-5xl w-full mb-12 px-4">
            <BarCell index={0} title={t("fifth.1.bar")} />
            <BarCell index={1} title={t("fifth.2.bar")} />
            <BarCell index={2} title={t("fifth.3.bar")} />
            <BarCell index={3} title={t("fifth.4.bar")} />
          </div>
          <div className="w-full flex h-full max-w-5xl">
            <button
              onClick={() => progressIndex > 0 && setProgressIndex(progressIndex - 1)}
              className="w-8 h-80 hover:bg-gray-100 flex items-center px-2 transition"
            >
              <img src={LeftArrow} alt="" />
            </button>
            <IndexCell />
            <button
              onClick={() => progressIndex < 3 && setProgressIndex(progressIndex + 1)}
              className="w-8 h-80 hover:bg-gray-100 flex items-center px-2 transition"
            >
              <img src={RightArrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const SixthSection = ({ companies }) => (
    <div className="mt-12 mb-24">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0 }}
        className="w-screen sm:w-full h-full px-6 flex-shrink-0 bg-white space-x-1 sm:justify-around"
      >
        <p className="text-xl font-bold text-gray-800 my-4">{t("companies")}</p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 h-full items-center flex-shrink-0 gap-x-3 gap-y-4 py-6">
          {Object.entries(companies).map((item, index) => (
            <CompanyCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );

  const SeventhSection = () => {
    return (
      <div
        style={{ backgroundColor: "#0E5034" }}
        className="flex w-screen items-center justify-center sm:flex-row flex-col py-24 text-center px-3 break-keep"
      >
        <div style={{ maxWidth: "1280px" }} className="flex flex-col items-center justify-center">
          <p className="mt-2 mb-12 text-xl text-white">{t("seventh.title")}</p>
          <Link to="/post-job/flow-1">
            <button className="text-green-700 text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold bg-white">
              {t("create")}
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden">
      <WelcomeSection />
      <HeroSection />
      <ClientSection />
      <DeveloperSection />
      <AssistantSection />
      <StrengthSection />
      <ProcessSection />
      <SixthSection companies={companyArray} />
      <SeventhSection />
    </div>
  );
};

export default Welcome;
