import React from "react";
import { IoClose } from "react-icons/io5";
import { WithContext as ReactTags } from "react-tag-input";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import Dropzone from "../../components/Dropzone";

const ProjectInfoPanel = ({
  projectTitle,
  setProjectTitle,
  projectTitleRef,
  projectDetail,
  setProjectDetail,
  projectDetailRef,
  projectMethod,
  setProjectMethod,
  projectMethodRef,
  projectType,
  setProjectType,
  projectTypeRef,
  projectCategory,
  setProjectCategory,
  projectCategoryRef,
  projectStatus,
  setProjectStatus,
  projectStatusRef,
  tech,
  setTech,
  techRef,
  uploadedFiles,
  setUploadedFiles,
  uploadedFilesRef,
  projectBudget,
  setProjectBudget,
  projectBudgetRef,
  projectStartAt,
  setProjectStartAt,
  projectStartAtRef,
  projectDuration,
  setProjectDuration,
  projectDurationRef,
}) => {
  const options = [
    { value: 1, label: "50만원 이하" },
    { value: 2, label: "100만원 이하" },
    { value: 3, label: "300만원 이하" },
    { value: 4, label: "500만원 ~ 1,000만원" },
    { value: 5, label: "1,000만원 ~ 2,000만원" },
    { value: 6, label: "2,000만원 ~ 3,000만원" },
    { value: 7, label: "3,000만원 ~ 5,000만원" },
    { value: 8, label: "5,000만원 ~ 1억원" },
    { value: 9, label: "1억원 이상" },
  ];
  const KeyCodes = { comma: 188, enter: 13 };
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
    setTech(newTags);
  };

  const Title = ({ title, subtitle, notRequired }) => (
    <>
      <div className="flex space-x-2">
        <h1 className="font-bold text-lg text-gray-700">{title}</h1>
        {!notRequired && <h1 className="font-bold text-xl text-red-500">*</h1>}
      </div>
      <p className="text-gray-600 text-sm mt-2">{subtitle}</p>
    </>
  );

  const OptionCard = ({ action, selectedCondition, title }) => (
    <button
      onClick={action}
      className={`${
        selectedCondition ? "ring-2 bg-green-600 bg-opacity-10 text-green-700" : "hover:ring-2 text-gray-500"
      } rounded border ring-green-600 transition flex items-center justify-center relative w-48 flex-shrink-0 h-20`}
    >
      <h1 className={`tracking-tighter break-keep`}>{title}</h1>
      <div
        className={`${
          selectedCondition ? "border-green-600 bg-green-600" : "border-gray-300"
        } w-4 h-4 bg-white rounded-full absolute top-3 right-3 border p-0.5 flex items-center justify-center`}
      >
        {selectedCondition && <div className="w-full h-full rounded-full bg-green-600 ring-2 ring-white" />}
      </div>
    </button>
  );

  return (
    <>
      <div ref={projectMethodRef} className="py-6">
        <Title title="1. 프로젝트 방식" subtitle="어떤 방식으로 프로젝트를 진행하시나요?" />
        <div className="flex space-x-2 mt-4">
          <OptionCard
            action={() => setProjectMethod(0)}
            selectedCondition={projectMethod === 0}
            title="단기 프로젝트 계약"
          />
          <OptionCard action={() => setProjectMethod(1)} selectedCondition={projectMethod === 1} title="인력 구인" />
        </div>
      </div>

      <div ref={projectTypeRef} className="py-6">
        <Title
          title="2. 프로젝트 분류"
          subtitle="신규 프로젝트 개발 혹은 기존 프로젝트 수정 또는 유지보수 개발인가요?"
        />
        <div className="flex space-x-2 mt-4">
          <OptionCard action={() => setProjectType(0)} selectedCondition={projectType === 0} title="신규 개발" />
          <OptionCard action={() => setProjectType(1)} selectedCondition={projectType === 1} title="수정 / 유지보수" />
        </div>
      </div>

      <div ref={projectTitleRef} className="py-6">
        <Title title="3. 프로젝트 제목" subtitle="개발자가 이해하기 쉽게 한줄로 요약해 주세요." />
        <input
          placeholder={"예시) 굿즈 사업자 브랜드 홈페이지 제작"}
          className="w-full h-12 rounded-lg border outline-green-600 p-3 mt-4"
          onChange={(event) => setProjectTitle(event.target.value)}
        />
      </div>

      <div ref={projectCategoryRef} className="py-6">
        <Title title="4. 프로젝트 카테고리" subtitle="복수 선택이 가능합니다." />
        <div className="flex space-x-2 mt-4">
          <OptionCard
            action={() =>
              setProjectCategory((prevState) => {
                return prevState.includes(0) ? [...prevState.filter((value) => value !== 0)] : [...prevState, 0];
              })
            }
            selectedCondition={projectCategory.includes(0)}
            title="웹사이트"
          />
          <OptionCard
            action={() =>
              setProjectCategory((prevState) => {
                return prevState.includes(1) ? [...prevState.filter((value) => value !== 1)] : [...prevState, 1];
              })
            }
            selectedCondition={projectCategory.includes(1)}
            title="모바일 앱"
          />
          <OptionCard
            action={() =>
              setProjectCategory((prevState) => {
                return prevState.includes(2) ? [...prevState.filter((value) => value !== 2)] : [...prevState, 2];
              })
            }
            selectedCondition={projectCategory.includes(2)}
            title="기타 소프트웨어"
          />
        </div>
      </div>

      <div ref={techRef} className="py-6">
        <Title
          title="5. 프로젝트 개발 언어"
          subtitle="각 개발 언어를 기입하시고 엔터키를 눌러 추가할 수 있습니다."
        />
        <ReactTags
          tags={tech}
          delimiters={delimiters}
          handleDelete={handleDeleteTECH}
          handleAddition={handleAdditionTECH}
          handleDrag={handleDragTECH}
          inputFieldPosition="top"
          autocomplete
          autofocus={false}
          placeholder={"개발 언어 입력 후 엔터키를 눌러 추가하세요. 예시) React JS, 상관없음"}
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
      </div>

      <div ref={projectStatusRef} className="py-6">
        <Title title="6. 현재 프로젝트 단계" subtitle="현재 프로젝트의 구현 단계를 선택해 주세요. 복수 선택 가능." />
        <div className="flex space-x-2 mt-4">
          <OptionCard
            action={() =>
              setProjectStatus((prevState) => {
                return prevState.includes(0) ? [...prevState.filter((value) => value !== 0)] : [...prevState, 0];
              })
            }
            selectedCondition={projectStatus.includes(0)}
            title={"아이디어 단계"}
          />
          <OptionCard
            action={() =>
              setProjectStatus((prevState) => {
                return prevState.includes(1) ? [...prevState.filter((value) => value !== 1)] : [...prevState, 1];
              })
            }
            selectedCondition={projectStatus.includes(1)}
            title={"기획된 문서가 있습니다"}
          />
          <OptionCard
            action={() =>
              setProjectStatus((prevState) => {
                return prevState.includes(2) ? [...prevState.filter((value) => value !== 2)] : [...prevState, 2];
              })
            }
            selectedCondition={projectStatus.includes(2)}
            title={"디자인이 있습니다"}
          />
          <OptionCard
            action={() =>
              setProjectStatus((prevState) => {
                return prevState.includes(3) ? [...prevState.filter((value) => value !== 3)] : [...prevState, 3];
              })
            }
            selectedCondition={projectStatus.includes(3)}
            title={"MVP가 있습니다"}
          />
        </div>
      </div>

      <div ref={uploadedFilesRef} className="py-6">
        <Title
          title="7. 프로젝트 자료"
          subtitle="아이디어, 기획문서, 개발/수정 내역 등  관련 문서를 추가해 주세요. 문서/압축/이미지/텍스트/PDF 파일만 등록 가능합니다."
          notRequired
        />
        <Dropzone setUploadedFiles={setUploadedFiles} />
        {uploadedFiles.map((value, index) => {
          return (
            <div
              key={index}
              className="w-1/2 h-10 mt-4 border rounded-lg border-1 flex items-center justify-between px-4 text-sm"
            >
              <div>
                <p>{value.name}</p>
              </div>
              <button
                className="py-6"
                onClick={(event) => {
                  setUploadedFiles((prevState) => {
                    const updatedFiles = [...prevState];
                    updatedFiles.splice(index, 1);
                    return updatedFiles;
                  });
                }}
              >
                <IoClose className="w-5 h-5 hover:text-red-500" />
              </button>
            </div>
          );
        })}
      </div>

      <div ref={projectDetailRef} className="py-6">
        <Title
          title="8. 프로젝트 상세 설명"
          subtitle="프로젝트 내용을 상세히 작성해 주실 수록, 더욱 빠르게 개발자 매칭이 됩니다. "
        />
        <textarea
          style={{ minHeight: "40rem" }}
          placeholder={`<프로젝트 개요>\n예시)\n- 프로젝트 소개\n - 현재 준비상황, 진행상황, 현재 개발 상황\n\n<상세한 업무 내용>\n 예시) \n - 개발 의뢰내용, 요청 내용\n - 주요 업무, 주요 기능, 작업 분량\n - 개발 환경, 개발 언어, 개발 방식, 필요 기술 등\n - 개발사 제공 자료 내역\n - 요구 사항, 필요 조건\n - 산출물 등\n \n <참고 사항 >\n 예시) \n - 앱 링크, 레퍼런스, 참고 사이트 등\n \n<유의 사항 >\n예시)\n - 기타 유의사항 등`}
          className="w-full rounded-lg border outline-green-600 p-3 mt-4"
          onChange={(event) => setProjectDetail(event.target.value)}
        />
      </div>

      <div ref={projectBudgetRef} className="py-6">
        <Title title="9. 프로젝트 예산" subtitle="프로젝트에 지출 가능한 예산을 선택해 주세요." />
        <Dropdown
          className="mt-4"
          options={options}
          placeholderClassName="text-gray-700"
          placeholder="~원(부가세 별도)"
          onChange={(arg) => setProjectBudget(arg)}
        />
      </div>

      <div ref={projectStartAtRef} className="py-6">
        <Title title="10. 프로젝트 희망 착수일" subtitle="희망하는 프로젝트 착수일을 선택해 주세요." />
        <div className="mt-4 w-64">
          <input
            placeholder={"숫자만 기입. 예시) 3"}
            className="w-64 h-12 rounded-lg border outline-green-600 p-3"
            type="date"
            onChange={(event) => setProjectStartAt(new Date(event.target.value).getTime())}
          />
        </div>
      </div>

      <div ref={projectDurationRef} className="py-6">
        <Title title="11. 프로젝트 예상 진행 기간" subtitle="프로젝트 예상 진행 기간을 선택해 주세요." />
        <div className="flex items-center mt-4 space-x-3">
          <input
            placeholder={"숫자만 기입. 예시) 3"}
            className="w-54 h-12 rounded-lg border outline-green-600 p-3"
            type="number"
            maxLength={3}
            onChange={(event) => setProjectDuration(event.target.value)}
          />
          <p className="text-gray-700 text-lg">개월</p>
        </div>
      </div>
    </>
  );
};

export default ProjectInfoPanel;
