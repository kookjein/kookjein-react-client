import React from "react";
import Option1 from "../../assets/assistant/1.png";
import Option2 from "../../assets/assistant/2.png";
import Option3 from "../../assets/assistant/3.png";
import Option4 from "../../assets/assistant/4.png";
import Option5 from "../../assets/assistant/5.png";
import Option6 from "../../assets/assistant/6.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AiOutlineCheck } from "react-icons/ai";
import Logo from "../../assets/logo.png";

const Assistant = () => {
  const { t } = useTranslation("assistant");

  const combinedArray = [
    {
      criterion: t("communication"),
      free_value: true,
      standard_value: true,
      enterprise_value: true,
      description: t("communication_description"),
    },
    {
      criterion: t("pre_contract_communication_support"),
      free_value: true,
      standard_value: true,
      enterprise_value: true,
      description: t("pre_contract_communication_support_description"),
    },
    {
      criterion: t("pre_contract_milestone_verification"),
      free_value: true,
      standard_value: true,
      enterprise_value: true,
      description: t("pre_contract_milestone_verification_description"),
    },
    {
      criterion: t("involvement_in_disputes"),
      free_value: true,
      standard_value: true,
      enterprise_value: true,
      description: t("involvement_in_disputes_description"),
    },
    {
      criterion: t("post_contract_communication_support"),
      free_value: t("basic_possible"),
      standard_value: t("standard_possible"),
      enterprise_value: t("enterprise_possible"),
      description: t("post_contract_communication_support_description"),
    },
    {
      criterion: t("third_party_meeting_request"),
      free_value: t("basic_possible"),
      standard_value: t("standard_possible"),
      enterprise_value: t("enterprise_possible"),
      description: t("third_party_meeting_request_description"),
    },
    {
      criterion: t("assistant_coding_knowledge"),
      free_value: false,
      standard_value: true,
      enterprise_value: true,
      description: t("assistant_coding_knowledge_description"),
    },
    {
      criterion: t("developer_headhunting"),
      free_value: false,
      standard_value: true,
      enterprise_value: true,
      description: t("developer_headhunting_description"),
    },
    {
      criterion: t("knowledge_transfer"),
      free_value: false,
      standard_value: false,
      enterprise_value: true,
      description: t("knowledge_transfer_description"),
    },
    {
      criterion: t("on_call_during_business_hours"),
      free_value: false,
      standard_value: false,
      enterprise_value: true,
      description: t("on_call_during_business_hours_description"),
    },
    {
      criterion: t("code_review_phase1"),
      free_value: false,
      standard_value: false,
      enterprise_value: true,
      description: t("code_review_phase1_description"),
    },
    {
      criterion: t("bug_resolution_emergency"),
      free_value: false,
      standard_value: false,
      enterprise_value: true,
      description: t("bug_resolution_emergency_description"),
    },
  ];

  const WelcomeSection = () => (
    <>
      <h1 className="font-bold  sm:text-2xl text-xl text-green-800">{t("assistantPlan")}</h1>
      <h2
        style={{ whiteSpace: "pre-line" }}
        className="sm:text-4xl text-3xl sm:leading-relaxed font-bold mt-4 break-keep max-w-xl leading-relaxed text-center sm:text-start"
      >
        {t("title")}
      </h2>

      <p style={{ color: "#5F6D7E" }} className=" mt-4 text-center break-keep">
        {t("first.subtitle2")}
      </p>
    </>
  );
  const PriceCard = ({ price, plan, text }) => {
    return (
      <div className="w-full flex flex-col justify-between h-full">
        <div className="">
          <div className="flex items-end space-x-2">
            <p className="text-3xl font-bold mb-3">
              {price === 0 ? t("second.card.free") : `${price}${t("second.card.currency")}`}
            </p>
            {price !== 0 && <p className="mb-3">{t("second.card.month")}</p>}
          </div>
          <p className="mb-3 text-lg">{plan}</p>
          <p style={{ whiteSpace: "pre-line" }} className="text-sm break-keep">
            {text}
          </p>
        </div>

        <Link to={plan === 0 ? "/auth/login" : "/assistant"}>
          <button
            className={`${
              price === 0 ? "bg-green-600 text-white" : "bg-white text-green-600"
            } flex items-center justify-center hover:brightness-125  w-36 h-10 rounded-md transition`}
          >
            <p className="font-bold text-sm">{price === 0 ? "지금 시작하기" : t("second.card.continue")}</p>
          </button>
        </Link>
      </div>
    );
  };

  const PriceTable = () => {
    const header = (
      <div className="w-full h-60 flex">
        <div className="w-1/4 h-full bg-gray-100 p-6 border-b">
          <p className="text-3xl font-bold mb-3 text-green-800">{t("service")}</p>
        </div>
        <div className="w-1/4 h-full bg-green-600 bg-opacity-20 p-6 text-green-800">
          <PriceCard price={0} plan={t("second.1.title")} text={t("second.1.text")} />
        </div>
        <div className="w-1/4 h-full bg-green-600 p-6 text-white">
          <PriceCard price={40} plan={t("second.2.title")} text={t("second.2.text")} />
        </div>
        <div className="w-1/4 h-full bg-green-900 p-6 text-white">
          <PriceCard price={160} plan={t("second.3.title")} text={t("second.3.text")} />
        </div>
      </div>
    );
    return (
      <div className="w-full overflow-hidden rounded-lg mt-24">
        {header}
        <div className="flex w-full bg-gray-50">
          <div className="w-1/4 divide-y border-l border-r border-b border-gray-150 divide-gray-150">
            {combinedArray.map((item) => (
              <div key={item.criterion} className="w-full flex items-center h-20 text-lg px-6 text-green-800 font-bold">
                {item.criterion}
              </div>
            ))}
          </div>
          <div className="w-1/4 divide-y border-r border-b border-gray-150 divide-gray-150">
            {combinedArray.map((item) => (
              <div key={item.criterion} className="w-full flex items-center justify-center h-20 text-lg px-6">
                {!item.free_value ? (
                  <p className="text-base text-gray-400">-</p>
                ) : item.free_value === true ? (
                  <AiOutlineCheck className="text-green-700 w-6 h-6" />
                ) : (
                  <p className="text-base text-gray-600">{item.free_value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="w-1/4 divide-y border-r border-b border-gray-150 divide-gray-150">
            {combinedArray.map((item) => (
              <div key={item.criterion} className="w-full flex items-center justify-center h-20 text-lg px-6">
                {!item.standard_value ? (
                  <p className="text-base text-gray-400">-</p>
                ) : item.standard_value === true ? (
                  <AiOutlineCheck className="text-green-700 w-6 h-6" />
                ) : (
                  <p className="text-base text-gray-600">{item.standard_value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="w-1/4 divide-y border-r border-b border-gray-150 divide-gray-150">
            {combinedArray.map((item) => (
              <div key={item.criterion} className="w-full flex items-center justify-center h-20 text-lg px-6">
                {!item.enterprise_value ? (
                  <p className="text-base text-gray-400">-</p>
                ) : item.enterprise_value === true ? (
                  <AiOutlineCheck className="text-green-700 w-6 h-6" />
                ) : (
                  <p className="text-base text-gray-600">{item.enterprise_value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ThirdSection = () => {
    const Cell = ({ icon, title, text, learnMore }) => (
      <div className="flex flex-col  px-7 py-5 rounded max-w-sm">
        <div className="flex items-center justify-between w-full">
          <img src={icon} className="w-10" alt="Kookjein assistant" draggable={false} />
          {learnMore && (
            <Link to="/">
              <button
                style={{ color: "#1FAD72" }}
                className="bg-white px-3 py-2 text-xs font-bold  rounded-md hover:opacity-75 transition"
              >
                {t("learnMore")}
              </button>
            </Link>
          )}
        </div>
        <p className="font-semibold mt-4">{title}</p>
        <p style={{ fontSize: "0.85rem", color: "#5F6D7E" }} className="text-xs mt-3 break-keep leading-5">
          {text}
        </p>
      </div>
    );
    return (
      <div className="mt-24 bg-green-700 bg-opacity-10 rounded-t-lg p-6 py-12">
        <p className=" text-2xl font-bold mb-4 px-4">{t("third.title")}</p>
        <p style={{ color: "#5F6D7E" }} className=" text-sm px-4 mb-12">
          {t("third.subtitle")}
        </p>
        <div className="grid sm:grid-cols-3 grid-cols-1 px-4 gap-16">
          <Cell icon={Option1} title={t("third.1.title")} text={t("third.1.text")} />
          <Cell icon={Option2} title={t("third.2.title")} text={t("third.2.text")} />
          <Cell icon={Option3} title={t("third.3.title")} text={t("third.3.text")} />
          <Cell icon={Option4} title={t("third.4.title")} text={t("third.4.text")} />
          <Cell icon={Option5} title={t("third.5.title")} text={t("third.5.text")} />
          <Cell icon={Option6} title={t("third.6.title")} text={t("third.6.text")} />
        </div>
      </div>
    );
  };

  const SeventhSection = () => {
    return (
      <div className="w-full bg-green-700 flex flex-col items-center p-16 rounded-b-lg">
        <img src={Logo} alt="logo" style={{ filter: "brightness(0) invert(1)" }} className="w-24 h-24" />
        <p className="mt-8 text-4xl text-white">{t("seventh.kookjein")}</p>
        <p className="mt-2 mb-12 text-xl text-white">{t("seventh.title")}</p>
        <Link to="/post-job/flow-1">
          <button className="text-green-700 text-md sm:text-lg px-4 sm:px-10 py-3 rounded-lg shadow hover:opacity-90 transition font-bold bg-white">
            {t("seventh.create")}
          </button>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#fff" }}
        className="flex h-full items-center flex-col sm:flex-row z-20 w-screen relative justify-center transition py-20 tracking-tight"
      >
        <div
          style={{ maxWidth: "1280px" }}
          className="w-full relative h-full flex px-4 flex-col items-center sm:items-start"
        >
          <WelcomeSection />
          <PriceTable />
          <ThirdSection />
          <SeventhSection />
        </div>
      </div>
    </>
  );
};

export default Assistant;
