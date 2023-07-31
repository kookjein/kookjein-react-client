import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { WithContext as ReactTags } from "react-tag-input";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Dropzone from "../components/Dropzone";

const StartPost = () => {
  const [projectMethod, setProjectMethod] = useState();
  const [projectType, setProjectType] = useState();
  const [projectCategory, setProjectCategory] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [tech, setTech] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([])

  const options = ["one", "two", "three"];

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

  const Title = ({ title, subtitle }) => (
    <>
      <div className="flex space-x-2 mt-12">
        <h1 className="font-bold text-xl text-gray-700">{title}</h1>
        <h1 className="font-bold text-xl text-red-500">*</h1>
      </div>
      <p className="text-gray-600 text-sm mt-2">{subtitle}</p>
    </>
  );

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
      <div style={{ maxWidth: "1280px" }} className="w-full h-full p-4 py-8 pb-48">
        <h1 className="font-bold text-3xl">프로젝트 등록</h1>
        <p className="text-gray-600 text-sm mt-2">효율적인 개발자 매칭을 위한 첫 단계</p>
        <Title title="1. 프로젝트 방식" subtitle="어떤 방식으로 프로젝트를 진행하시나요?" />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setProjectMethod(0)}
            className={`${
              projectMethod === 0 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">단기 프로젝트 계약</h1>
            <div
              className={`${
                projectMethod === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectMethod === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectMethod(1)}
            className={`${
              projectMethod === 1 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">인력 구인</h1>
            <div
              className={`${
                projectMethod === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectMethod === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
        </div>
        <Title
          title="2. 프로젝트 분류"
          subtitle="신규 프로젝트 개발 혹은 기존 프로젝트 수정 또는 유지보수 개발인가요?"
        />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setProjectType(0)}
            className={`${
              projectType === 0 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">신규 개발</h1>
            <div
              className={`${
                projectType === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectType === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectType(1)}
            className={`${
              projectType === 1 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">수정 / 유지보수</h1>
            <div
              className={`${
                projectType === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectType === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
        </div>
        <Title title="3. 프로젝트 제목" subtitle="개발자가 이해하기 쉽게 한줄로 요약해 주세요." />
        <input
          placeholder={"예시) 굿즈 사업자 브랜드 홈페이지 제작"}
          className="w-full h-12 rounded-lg border outline-green-600 p-3 border mt-4"
        />
        <Title title="4. 프로젝트 카테고리" subtitle="복수 선택이 가능합니다." />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setProjectCategory(0)}
            className={`${
              projectCategory === 0 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">웹사이트</h1>
            <div
              className={`${
                projectCategory === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectCategory === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectCategory(1)}
            className={`${
              projectCategory === 1 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">모바일 앱</h1>
            <div
              className={`${
                projectCategory === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectCategory === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectCategory(2)}
            className={`${
              projectCategory === 2 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">기타 소프트웨어</h1>
            <div
              className={`${
                projectCategory === 2 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectCategory === 2 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
        </div>
        <Title
          title="5. 프로젝트 개발 언어 및 환경"
          subtitle="각 개발 언어를 기입하시고 엔터키를 눌러 추가할 수 있습니다."
        />
        <ReactTags
          tags={tech}
          delimiters={delimiters}
          handleDelete={handleDeleteTECH}
          handleAddition={handleAdditionTECH}
          handleDrag={handleDragTECH}
          handleTagClick={handleTagClickTECH}
          inputFieldPosition="top"
          autocomplete
          placeholder={"개발 언어 또는 개발 환경을 입력해주세요. 예시) React JS"}
          classNames={{
            tags: "mb-12",
            tagInput: "h-12",
            tagInputField: "w-full h-12 rounded border border-gray-300 mb-4 p-2 outline-green-700 mt-4",
            selected: "flex flex-wrap gap-1",
            tag: "px-3 py-1 bg-gray-200 rounded border text-sm flex-shrink-0 mt-6",
            remove: "ml-2",
            suggestions: "",
            activeSuggestion: "",
            editTagInput: "",
            editTagInputField: "",
            clearAll: "",
          }}
        />
        <Title title="6. 현재 프로젝트 단계" subtitle="현재 프로젝트의 구현 단계를 선택해 주세요. 복수 선택 가능." />
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => setProjectStatus(0)}
            className={`${
              projectStatus === 0 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">아이디어 단계</h1>
            <div
              className={`${
                projectStatus === 0 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectStatus === 0 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectStatus(1)}
            className={`${
              projectStatus === 1 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">기획된 문서가 있습니다</h1>
            <div
              className={`${
                projectStatus === 1 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectStatus === 1 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectStatus(2)}
            className={`${
              projectStatus === 2 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">디자인이 있습니다</h1>
            <div
              className={`${
                projectStatus === 2 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectStatus === 2 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
          <button
            onClick={() => setProjectStatus(3)}
            className={`${
              projectStatus === 3 ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
            } rounded border ring-green-600 transition flex items-center justify-center relative w-56 flex-shrink-0 h-20`}
          >
            <h1 className="break-keep">MVP가 있습니다.</h1>
            <div
              className={`${
                projectStatus === 3 ? "border-green-600 bg-green-600" : "border-gray-300"
              } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
            >
              {projectStatus === 3 && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
            </div>
          </button>
        </div>
        <Title
          title="7. 프로젝트 자료"
          subtitle="아이디어, 기획문서, 개발/수정 내역 등  관련 문서를 추가해 주세요. 문서/압축/이미지/텍스트/PDF 파일만 등록 가능합니다."
        />
        <Dropzone setUploadedFiles={setUploadedFiles}/>
        {
          uploadedFiles.map((value, index) => {
            return <div key={index} className="w-1/2 h-10 mt-4 border rounded-lg border-1 flex items-center justify-between px-4 text-sm">
                <div>
                  <p>{value.name}</p>
                </div>
                <button className="" onClick={(event)=> {
                  setUploadedFiles((prevState) => {
                    const updatedFiles = [...prevState]
                    updatedFiles.splice(index, 1)
                    return updatedFiles
                  })
                }}>
                  <IoClose className="w-5 h-5 hover:text-red-500" />
                </button>
            </div>
          })
        }
        <Title
          title="8. 프로젝트 상세 설명"
          subtitle="프로젝트 내용을 상세히 작성해 주실 수록, 더욱 빠르게 개발자 매칭이 됩니다. "
        />
        <textarea
          style={{ minHeight: "40rem" }}
          placeholder={`<프로젝트 개요>\n예시)\n- 프로젝트 소개\n - 현재 준비상황, 진행상황, 현재 개발 상황\n\n<상세한 업무 내용>\n 예시) \n - 개발 의뢰내용, 요청 내용\n - 주요 업무, 주요 기능, 작업 분량\n - 개발 환경, 개발 언어, 개발 방식, 필요 기술 등\n - 개발사 제공 자료 내역\n - 요구 사항, 필요 조건\n - 산출물 등\n \n <참고 사항 >\n 예시) \n - 앱 링크, 레퍼런스, 참고 사이트 등\n \n<유의 사항 >\n예시)\n - 기타 유의사항 등
          `}
          className="w-full rounded-lg border outline-green-600 p-3 mt-4"
        />
        <Title title="9. 프로젝트 예산" subtitle="프로젝트에 지출 가능한 예산을 선택해 주세요." />
        <Dropdown className="mt-4" options={options} placeholder="Select an option" />;
      </div>
    </div>
  );
};

export default StartPost;
