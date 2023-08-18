import React, { useEffect, useState } from "react";
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
  const [companyArray, setCompanyArray] = useState([]);
  const [employeeArray, setEmployeeArray] = useState({});

  useEffect(() => {
    axios
      .get(`/v1/company/all`)
      .then((response) => {
        setCompanyArray(response.data);
      })
      .catch((e) => {
        console.log("V1/COMPANY/ALL ERROR : ", e);
      });

    axios
      .get(`/v1/user/employees`)
      .then((response) => {
        setEmployeeArray(response.data);
      })
      .catch((e) => {
        console.log("V1/USER/EMPLOYEES ERROR : ", e);
      });

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
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              t("type.2"),
              1000,
              t("type.3"),
              1000,
              t("type.4"),
              1000,
              t("type.5"),
              1000,
              t("type.6"),
              1000,
              t("type.7"),
              1000,
            ]}
            wrapper="span"
            speed={25}
            repeat={Infinity}
            className="font-bold tracking-tight sm:text-6xl text-4xl"
          />
          <p className="font-bold leading-relaxed sm:text-6xl text-4xl">{t("type.fixed")}</p>
          <p
            style={{ whiteSpace: "pre-line" }}
            className="mt-8 text-md sm:text-xl text-gray-600 tracking-tight text-center leading-9"
          >
            {t("subtitle")}
          </p>

          <div className="w-full flex justify-center space-x-4 mt-8 tracking-tight">
            <button className="text-white text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold bg-green-700">
              {t("create")}
            </button>
            <button className="bg-white text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold text-gray-700 border hover:bg-gray-100">
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
        <div className="mt-24 w-full px-4 sm:mb-12 mb-24">
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
      <p className="font-semibold text-gray-600 text-center">{t("trust")}</p>
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

  const SecondSection = () => (
    <div
      style={{ backgroundColor: "#FAFAFD" }}
      className="flex w-screen items-center justify-center sm:flex-row flex-col pb-24"
    >
      <div
        style={{ maxWidth: "1280px" }}
        className="flex items-center justify-between sm:flex-row flex-col px-4 sm:space-x-24 sm:pr-12"
      >
        <img src={t("second.lanyard")} alt="" className="max-w-xs" draggable={false} />
        <div className="flex flex-col items-center sm:ml-16 sm:mt-32 mt-12">
          <p className="text-3xl font-bold">{t("second.title1")}</p>
          <p className="text-3xl font-bold mt-2">{t("second.title2")}</p>
          <p className="mt-12">{t("second.body1")}</p>
          <p>{t("second.body2")}</p>
          <p className="mt-6">{t("second.body3")}</p>
          <p>{t("second.body4")}</p>

          <div className="mt-16 text-xs w-full flex justify-end">{t("second.timestamp")}</div>
        </div>
      </div>
    </div>
  );

  const ThirdSection = () => (
    <div
      style={{ backgroundColor: "#FAFAFD" }}
      className="flex w-screen items-center justify-center sm:flex-row flex-col-reverse py-24"
    >
      <div
        style={{ maxWidth: "1280px" }}
        className="flex items-center justify-center sm:flex-row flex-col-reverse sm:space-x-24 sm:pl-12"
      >
        <div className="flex flex-col items-center mt-12 sm:mt-0">
          <p className="text-3xl font-bold">{t("third.title1")}</p>
          <p className="text-3xl font-bold mt-2">{t("third.title2")}</p>
          <p className="mt-12">{t("third.body1")}</p>
          <p className="">{t("third.body2")}</p>
          <p className="mt-6">{t("third.body3")}</p>
          <p>{t("third.body4")}</p>
          <p className="mt-6">{t("third.body5")}</p>
          <p>{t("third.body6")}</p>

          <div className="mt-16 text-xs w-full flex justify-end">{t("third.timestamp")}</div>
        </div>
        <img src={TechStack} alt="" className="w-screen sm:w-auto max-w-lg px-4" draggable={false} />
      </div>
    </div>
  );

  const FourthSection = () => {
    const Cell = ({ icon, title, text1, text2 }) => (
      <div className="flex flex-col items-center">
        <img src={icon} className="w-16" alt="" draggable={false} />
        <p className="font-semibold mt-4">{title}</p>
        <p style={{ fontSize: "0.85rem" }} className="text-sm mt-4">
          {text1}
        </p>
        <p style={{ fontSize: "0.85rem" }} className="text-sm">
          {text2}
        </p>
      </div>
    );
    return (
      <div className="flex w-screen items-center justify-center sm:flex-row flex-col py-24">
        <div style={{ maxWidth: "1280px" }} className="w-full">
          <p className="text-lg mb-16 px-4 font-bold">{t("fourth.sectionTitle")}</p>
          <div className="grid sm:grid-cols-3 grid-cols-1 px-4 gap-16">
            <Cell
              icon={FourthType1}
              title={t("fourth.1.title")}
              text1={t("fourth.1.body1")}
              text2={t("fourth.1.body2")}
            />
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
            <Cell
              icon={FourthType4}
              title={t("fourth.4.title")}
              text1={t("fourth.4.body1")}
              text2={t("fourth.4.body2")}
            />
            <Cell
              icon={FourthType5}
              title={t("fourth.5.title")}
              text1={t("fourth.5.body1")}
              text2={t("fourth.5.body2")}
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
    );
  };

  const FifthSection = () => {
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
        style={{ backgroundColor: "#FAFAFD" }}
        className="flex w-screen items-center justify-center sm:flex-row flex-col-reverse py-24"
      >
        <div style={{ maxWidth: "1280px" }} className="flex flex-col w-full items-center h-full px-4">
          <p className="text-xl font-bold mb-20 px-4 w-full">{t("fifth.sectionTitle")}</p>

          <div className="flex max-w-4xl w-full mb-12 px-4">
            <BarCell index={0} title={t("fifth.1.bar")} />
            <BarCell index={1} title={t("fifth.2.bar")} />
            <BarCell index={2} title={t("fifth.3.bar")} />
            <BarCell index={3} title={t("fifth.4.bar")} />
          </div>
          <div className="w-full flex h-full max-w-4xl">
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
          <Link to="/browse">
            <button
              style={{ backgroundColor: "#FFFFFF", color: "#0E5034" }}
              className="text-sm px-4 py-2 rounded-full shadow hover:opacity-90 transition font-semibold"
            >
              {t("seventh.button")}
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
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection companies={companyArray} />
      <SeventhSection />
    </div>
  );
};

export default Welcome;
