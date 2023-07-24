import React, { useContext, useEffect, useState } from "react";
import axios from "../utils/authAxios";
import { AuthContext } from "../utils/authContext";
import { useTranslation } from "react-i18next";
import { AiOutlinePlus } from "react-icons/ai";
import { WithContext as ReactTags } from "react-tag-input";

const PostJob = () => {
  const { userState } = useContext(AuthContext);
  const { i18n } = useTranslation("postJob");
  const lang = i18n.language.includes("en") ? "en" : "ko";

  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/v1/user/`, { params: { user_id: userState.user.userId } })
      .then((response) => {
        setUserInfo(response.data);
        console.log(response.data);
        // developerInfo.current = response.data.user.user_profile[0];
        setLoading(false);
      })
      .catch((e) => {
        console.log("V1/USER/ ERROR : ", e);
        setLoading(false);
      });
  }, [userState]);

  const LeftPanel = () => {
    return (
      <div
        style={{ height: "calc(100svh - 6.5rem)", color: "#272D37" }}
        className="w-screen sm:w-80 flex border-r flex-col items-center flex-shrink-0 overflow-y-auto bg-white"
      >
        <div className="w-full border-b p-4 space-y-4">
          <div className="flex space-x-3">
            <img src={userInfo.user.user_img} alt="" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="text-lg">{userInfo.user.user_profile[0].name[lang]}</p>
              <p className="text-sm text-gray-500">
                {userInfo.user.user_profile[0].title[lang]} at {userInfo.company.company_name}
              </p>
            </div>
          </div>
          <button className="w-full h-10 bg-green-600 rounded text-white flex items-center justify-center space-x-2 hover:brightness-125">
            <AiOutlinePlus className="text-white w-4 h-4" />
            <p className="text-sm">새로운 채용 등록</p>
          </button>
        </div>
      </div>
    );
  };

  const RightPanel = () => {
    const [tech, setTech] = useState([]);
    const [checked, setChecked] = useState(false);
    const KeyCodes = {
      comma: 188,
      enter: 13,
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    const handleDeleteTECH = (i) => {
      setTech(tech.filter((tag, index) => index !== i));
    };

    const handleAdditionTECH = (tag) => {
      setTech([...tech, tag]);
    };

    const handleDragTECH = (tag, currPos, newPos) => {
      const newTags = tech.slice();

      newTags.splice(currPos, 1);
      newTags.splice(newPos, 0, tag);

      // re-render
      setTech(newTags);
    };

    const handleTagClickTECH = (index) => {
      console.log("The tag at index " + index + " was clicked");
    };

    const Cell = ({ title, placeholder, hasCheck = false }) => (
      <div>
        <div className="w-full flex">
          <div className="w-36 flex-shrink-0 mt-2">
            <p className="text-green-700 font-bold text-lg">{title}</p>
          </div>
          <div className="w-full">
            <input
              placeholder={placeholder}
              disabled={hasCheck && checked}
              className="w-full h-10 rounded-lg border outline-green-600 p-3"
            />
          </div>
        </div>
        {hasCheck && (
          <div className="flex items-center space-x-2 ml-36 mt-2">
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <p className="text-sm text-gray-700">본인입니다</p>
          </div>
        )}
      </div>
    );

    const AreaCell = ({ title, placeholder }) => (
      <div className="w-full flex">
        <div className="w-36 flex-shrink-0 mt-2">
          <p className="text-green-700 font-bold text-lg">{title}</p>
        </div>
        <div className="w-full">
          <textarea placeholder={placeholder} className="w-full h-48 rounded-lg border outline-green-600 p-3" />
        </div>
      </div>
    );

    const TagCell = ({ title, placeholder }) => (
      <div className="w-full flex">
        <div className="w-36 flex-shrink-0 mt-2">
          <p className="text-green-700 font-bold text-lg">{title}</p>
        </div>
        <div className="w-full">
          <ReactTags
            tags={tech}
            delimiters={delimiters}
            handleDelete={handleDeleteTECH}
            handleAddition={handleAdditionTECH}
            handleDrag={handleDragTECH}
            handleTagClick={handleTagClickTECH}
            inputFieldPosition="top"
            autocomplete
            placeholder={placeholder}
            classNames={{
              tags: "mb-8",
              tagInput: "h-12",
              tagInputField: "w-full h-9 rounded border border-gray-300 mb-4 p-2 outline-green-700",
              selected: "flex flex-wrap gap-1",
              tag: "px-3 py-1 bg-gray-200 rounded border text-sm flex-shrink-0",
              remove: "ml-2",
              suggestions: "",
              activeSuggestion: "",
              editTagInput: "",
              editTagInputField: "",
              clearAll: "",
            }}
          />
        </div>
      </div>
    );

    return (
      <div style={{ height: "calc(100svh - 6.5rem)" }} className="w-full p-6 space-y-6">
        <Cell placeholder="공고 제목을 입력하세요" title={"공고제목"} />
        <TagCell title={"필수 개발 언어"} placeholder={"개발 언어를 작성하고 Enter로 등록하세요."} />
        <AreaCell title={"업무 설명"} />
        <Cell title={"담당자명"} hasCheck={true} />
        <Cell title={"이메일"} />
        <Cell title={"연락처"} />
      </div>
    );
  };

  if (!isLoading)
    return (
      <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
        <div
          style={{ maxWidth: "1280px", height: "calc(100svh - 6.5rem)" }}
          className="w-full h-full flex-shrink-0 pb-32 mt-6 bg-white h-full border rounded-t overflow-hidden flex"
        >
          <LeftPanel />
          <RightPanel />
        </div>
      </div>
    );
};

export default PostJob;
