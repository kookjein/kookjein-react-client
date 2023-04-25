import React from "react";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const ManageWork = () => {
  const { t } = useTranslation("developerProfile");

  const Divider = () => <div className="w-full h-px border-t border-gray-300 mb-6 mt-3" />;

  const TitleText = ({ text }) => (
    <p style={{ color: "#176544" }} className="text-lg font-bold text-gray-400">
      {text}
    </p>
  );

  const LeftPanel = () => (
    <div
      style={{ minHeight: "calc(100vh - 5rem)", color: "#272D37" }}
      className="w-96 flex border-r flex-col items-center p-8 space-y-6 flex-shrink-0"
    >
      <div className="w-36 h-36 bg-gray-100 rounded-full overflow-hidden"></div>

      <p className="text-xl">asd</p>
      <div className="text-sm text-gray-500 flex flex-col items-center space-y-1">
        <p className="">rrr</p>
        <p style={{ color: "#0E5034" }} className="font-bold">
          asd
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
        123
      </p>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("programming_lang")} />
      </div>

      <Divider />

      <div className="w-full space-y-4">
        <TitleText text={t("lang")} />
        <div className="w-full gap-2 flex flex-wrap"></div>
      </div>

      <Divider />

      <div className="w-full space-y-4"></div>

      <Divider />
    </div>
  );

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
      <Navbar2 light />
      <div style={{ maxWidth: "1280px" }} className="w-full h-full px-4 flex">
        <LeftPanel />
      </div>
      <Footer />
    </div>
  );
};

export default ManageWork;
