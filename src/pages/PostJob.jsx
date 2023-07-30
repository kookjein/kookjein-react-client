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
    const Cell = () => {
      return (
        <div className="h-28 border-b w-full hover:bg-gray-100 p-4 space-y-2">
          <p
            className="font-bold break-keep"
            style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
          >
            공고 제목공고 제목공고 제목공고 제목공고 제목공고 제목
          </p>
          <p className="text-sm text-gray-500">2023.07.23</p>
          <p className="text-sm text-gray-500">담당자명 · 회사명</p>
          <p className="text-sm text-gray-500"></p>
        </div>
      );
    };
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
            <p className="text-sm">새로운 프로젝트 등록</p>
          </button>
        </div>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    );
  };

  const RightPanel = () => {
    const [tech, setTech] = useState([]);
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

    return (
      <div style={{ height: "calc(100svh - 6.5rem)" }} className="w-full p-6 space-y-6 overflow-y-auto">
        <div>
          <div className="w-full flex">
            <div className="w-36 flex-shrink-0 mt-2">
              <p className="text-green-700 font-bold text-lg">{"공고제목 *"}</p>
            </div>
            <div className="w-full">
              <input
                placeholder={"공고 제목을 입력하세요"}
                className="w-full h-10 rounded-lg border outline-green-600 p-3"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-36 flex-shrink-0 mt-2">
            <p className="text-green-700 font-bold text-lg">{"필수 개발 언어 *"}</p>
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
              placeholder={"개발 언어를 작성하고 Enter로 등록하세요."}
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
        <div className="w-full flex">
          <div className="w-36 flex-shrink-0 mt-2">
            <p className="text-green-700 font-bold text-lg">{"업무 설명 *"}</p>
          </div>
          <div className="w-full">
            <textarea
              style={{ minHeight: "12rem" }}
              placeholder={"개발자가 이해할 수 있도록 업무에 관련된 사항 및 마일스톤, 로드맵을 작성하세요"}
              className="w-full rounded-lg border outline-green-600 p-3"
            />
          </div>
        </div>
        <div>
          <div className="w-full flex">
            <div className="w-36 flex-shrink-0 mt-2">
              <p className="text-green-700 font-bold text-lg">{"담당자명 *"}</p>
            </div>
            <div className="w-full">
              <input
                placeholder={"담당자명을 작성하세요"}
                className="w-full h-10 rounded-lg border outline-green-600 p-3"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex">
            <div className="w-36 flex-shrink-0 mt-2">
              <p className="text-green-700 font-bold text-lg">{"이메일 *"}</p>
            </div>
            <div className="w-full">
              <input
                placeholder={"담당자의 이메일을 작성하세요"}
                className="w-full h-10 rounded-lg border outline-green-600 p-3"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-full flex">
            <div className="w-36 flex-shrink-0 mt-2">
              <p className="text-green-700 font-bold text-lg">{"연락처 *"}</p>
            </div>
            <div className="w-full">
              <input
                placeholder={"담당자의 연락처를 작성하세요"}
                className="w-full h-10 rounded-lg border outline-green-600 p-3"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button className="h-9 px-6 bg-green-600 text-sm text-white rounded hover:brightness-125">프로젝트 등록</button>
        </div>
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
