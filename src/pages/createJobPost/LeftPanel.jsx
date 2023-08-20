import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { BsCheckLg } from "react-icons/bs";

const LeftPanel = ({ registerPost, toSignup, sectionRefs, currentStep }) => {
  const { userState } = useContext(AuthContext);
  const [missingArray, setMissingArray] = useState([]);

  const continuePressed = () => {
    const missingArray = [];
    sectionRefs.forEach((item) => {
      if (
        !(Array.isArray(item.value) && item.value.length > 0) &&
        !(!Array.isArray(item.value) && item.value !== null && item.value !== "")
      ) {
        if (item.name !== "7. 프로젝트 자료") {
          missingArray.push(item.name);
          setMissingArray((prev) => [...prev, item.name]);
        }
      }
    });
    if (missingArray.length === 0) {
      if (userState.user) {
        registerPost();
      } else {
        toSignup();
      }
    }
  };

  const Progress = ({ title, innerRef, value }) => (
    <button
      className="flex h-7 items-center group space-x-4"
      onClick={(e) => {
        currentStep === 0 && innerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      <div className="w-5 flex justify-center">
        {(Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value !== null && value !== "") ? (
          <BsCheckLg className="text-green-700" />
        ) : (
          <div className={`${missingArray.indexOf(title) > -1 ? "bg-red-500" : "bg-gray-300"} h-0.5 w-3 rounded`}></div>
        )}
      </div>
      <p
        className={`text-sm font-normal ${
          (Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value !== null && value !== "")
            ? "text-black group-hover:text-gray-600"
            : missingArray.indexOf(title) > -1
            ? "text-red-500"
            : "text-gray-400 group-hover:text-gray-500"
        }`}
      >
        {title}
      </p>
    </button>
  );

  return (
    <div
      style={{ height: "calc(100svh - 4rem)" }}
      className="fixed w-80 bg-zinc-50 flex-shrink-0 p-8 flex flex-col justify-between border-r tracking-tight overflow-y-auto"
    >
      <div className="mb-6">
        <h1 className="font-bold text-2xl text-gray-700">프로젝트 등록</h1>
        <p className="text-gray-600 text-sm mt-2 break-keep">효율적인 개발자 매칭을 위한 첫 단계</p>

        <div className="font-bold mt-8 text-gray-600">
          <div className="flex space-x-2 items-center">
            <p>프로젝트 정보 등록</p>
            {currentStep > 0 && <BsCheckLg className="text-green-700" />}
          </div>
          <div className={`mt-2 ${currentStep > 0 && "hidden"}`}>
            {sectionRefs.map((item) => (
              <Progress key={item.name} title={item.name} innerRef={item.ref} value={item.value} />
            ))}
          </div>
          {!userState.isAuthenticated && (
            <div className="flex space-x-2 items-center mt-4">
              <p className={`${currentStep > 0 ? "font-bold text-gray-600" : "text-gray-400 font-normal"}`}>회원가입</p>
              {currentStep > 1 && <BsCheckLg className="text-green-700" />}
            </div>
          )}
          <p className={`${currentStep > 1 ? "font-bold text-gray-600" : "text-gray-400 font-normal"} mt-4`}>
            프로젝트 등록 완료
          </p>
        </div>
      </div>
      {currentStep === 0 && (
        <div className="w-full">
          {missingArray.length > 0 && <p className="text-sm text-red-500 mb-4">필수 항목을 기입하세요</p>}
          <button
            className="h-11 flex items-center justify-center bg-green-700 text-white rounded hover:bg-green-600 w-full font-bold"
            onClick={continuePressed}
          >
            프로젝트 등록
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
