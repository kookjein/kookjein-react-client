import React, { useEffect, useState } from "react";
import Navbar2 from "../components/Navbar2";
import Tags from "../components/Tags";
import { IoLocationSharp } from "react-icons/io5";
import { BiTime } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdOutlineAttachMoney, MdOutlineWork } from "react-icons/md";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import { BsFillPencilFill } from "react-icons/bs";

const DeveloperProfile = () => {
  const { t, i18n } = useTranslation("developerProfile");
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const isMyProfile = searchParams.get("up_rollout") === "true";
  const lang = i18n.language.includes("en") ? "en" : "ko";
  const [developerInfo, setDeveloperInfo] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.75)" },
  };

  useEffect(() => {
    axios
      .get("https://kookjein.s3.ap-northeast-2.amazonaws.com/sample/data.json")
      .then((res) => {
        setDeveloperInfo(res.data[userId]);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
    return () => {};
  }, [userId]);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const Divider = () => <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />;

  const TitleText = ({ text }) => (
    <p style={{ color: "#176544" }} className="text-lg font-bold text-gray-400">
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
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0 relative"
    >
      <button
        className="absolute top-4 right-4 w-8 h-8 bg-green-800 hover:bg-green-700 flex items-center justify-center text-white rounded-full transition"
        onClick={() => openModal()}
      >
        <BsFillPencilFill />
      </button>

      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden">
        <img src={developerInfo.img} alt="" className="object-cover w-full h-full" />
      </div>

      <p className="text-xl">
        {developerInfo.name[lang]} {isMyProfile && "*"}
      </p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">{developerInfo.title[lang]}</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          {developerInfo.company[lang]}
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
        {developerInfo.oneLiner[lang]}
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("programming_lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {developerInfo.tech.map((item) => (
            <Tags key={item} size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("lang")} />
        <div className="w-full gap-2 flex flex-wrap">
          {developerInfo.lang[lang].map((item) => (
            <Tags key={item} size={"sm"} item={item} />
          ))}
        </div>
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <div className="w-full flex flex-col space-y-3">
          <SummaryCell value={t("status1.value")} title={t("status1.title")} icon={<MdOutlineWork />} />
          <SummaryCell value={t("status2.value")} title={t("status2.title")} icon={<IoLocationSharp />} />
          <SummaryCell value={`1 ${t("status4.value")}`} title={t("status3.title")} icon={<AiTwotoneCalendar />} />
          <SummaryCell
            value={`${(developerInfo.price * 10000).toLocaleString("en-US", {
              style: "currency",
              currency: "KRW",
            })} KRW`}
            title={t("status5.title")}
            icon={<MdOutlineAttachMoney />}
          />
          <SummaryCell value={t("status6.value")} title={t("status6.title")} icon={<BiTime />} />
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
        <a className="text-sm text-blue-500 font-bold" href="/user/profile">
          {link}
        </a>
        <p className="text-sm break-keep">{desc}</p>
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
        className="w-full flex h-full flex-col p-8 space-y-6 px-12 relative"
      >
        <button
          className="absolute top-4 right-4 w-8 h-8 bg-green-800 hover:bg-green-700 flex items-center justify-center text-white rounded-full transition"
          onClick={() => openModal()}
        >
          <BsFillPencilFill />
        </button>
        <TitleText text={t("intro")} />
        <p className="break-keep text-sm">{developerInfo.intro[lang]}</p>

        {developerInfo.k_experience.length > 0 && (
          <>
            <Divider />

            <TitleText text={t("k_exp")} />

            {developerInfo.k_experience.map((item) => (
              <CompanyCell
                key={item.company[lang]}
                img={item.logo}
                period={`${item.from[lang]} ~ ${item.to[lang]}`}
                year="8개월"
                title={`${item.company[lang]} | ${item.title[lang]}`}
              />
            ))}
          </>
        )}

        <Divider />

        <TitleText text={t("exp")} />

        {developerInfo.experience.map((item) => (
          <CompanyCell2
            key={item.company}
            period={`${item.from[lang]} ~ ${item.to[lang]}`}
            year="8개월"
            title={`${item.company} | ${item.title[lang]}`}
            desc={item.desc[lang]}
          />
        ))}

        <Divider />
        <TitleText text={t("projects")} />

        {developerInfo.projects.map((item) => (
          <ProjectCell key={item.name} name={item.name} link={item.link} desc={item.desc[lang]} />
        ))}

        <Divider />
        <TitleText text={t("education")} />

        {developerInfo.education.map((item) => (
          <EducationCell
            key={item.name}
            name={item.name}
            title={item.title[lang]}
            from={item.from[lang]}
            to={item.to[lang]}
            desc={item.desc[lang]}
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

  if (!isLoading)
    return (
      <>
        <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles}>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>

        <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden z-10">
          <Navbar2 light />

          <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
            <LeftPanel />
            <RightPanel />
          </div>
          <Footer />
        </div>
      </>
    );
};

export default DeveloperProfile;
