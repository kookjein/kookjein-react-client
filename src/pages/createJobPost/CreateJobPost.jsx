import React, { useContext, useRef, useState } from "react";
import axios from "../../utils/authAxios";
import { AuthContext } from "../../context/authContext";
import { s3Upload } from "../../utils/s3Upload";
import Signup from "../../components/auth/Signup";
import ProjectInfoPanel from "./ProjectInfoPanel";
import LeftPanel from "./LeftPanel";
import JobPostComplete from "./JobPostComplete";
import { useEffect } from "react";

const CreateJobPost = () => {
  const { userState } = useContext(AuthContext);
  const [project, setProject] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [projectTitle, setProjectTitle] = useState(null);
  const [projectDetail, setProjectDetail] = useState(null);
  const [projectMethod, setProjectMethod] = useState(null);
  const [projectType, setProjectType] = useState(null);
  const [projectCategory, setProjectCategory] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [tech, setTech] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [projectBudget, setProjectBudget] = useState(null);
  const [projectStartAt, setProjectStartAt] = useState(null);
  const [projectDuration, setProjectDuration] = useState(null);

  const projectTitleRef = useRef(null);
  const projectDetailRef = useRef(null);
  const projectMethodRef = useRef(null);
  const projectTypeRef = useRef(null);
  const projectCategoryRef = useRef(null);
  const projectStatusRef = useRef(null);
  const techRef = useRef(null);
  const uploadedFilesRef = useRef(null);
  const projectBudgetRef = useRef(null);
  const projectStartAtRef = useRef(null);
  const projectDurationRef = useRef(null);

  const sectionRefs = [
    { name: "1. 프로젝트 방식", ref: projectMethodRef, value: projectMethod },
    { name: "2. 프로젝트 분류", ref: projectTypeRef, value: projectType },
    { name: "3. 프로젝트 제목", ref: projectTitleRef, value: projectTitle },
    { name: "4. 프로젝트 카테고리", ref: projectCategoryRef, value: projectCategory },
    { name: "5. 프로젝트 개발 언어 및 환경", ref: techRef, value: tech },
    { name: "6. 현재 프로젝트 단계", ref: projectStatusRef, value: projectStatus },
    { name: "7. 프로젝트 자료", ref: uploadedFilesRef, value: uploadedFiles },
    { name: "8. 프로젝트 상세 설명", ref: projectDetailRef, value: projectDetail },
    { name: "9. 프로젝트 예산", ref: projectBudgetRef, value: projectBudget },
    { name: "10. 프로젝트 희망 착수일", ref: projectStartAtRef, value: projectStartAt },
    { name: "11. 프로젝트 예상 진행 기간", ref: projectDurationRef, value: projectDuration },
  ];

  useEffect(() => {
    console.log(project);
    return () => {};
  }, [currentStep, project]);

  const registerPost = () => {
    axios
      .post("v1/project/", {
        project: {
          project_info: [
            {
              method: projectMethod,
              type: projectType,
              title: { [userState.user.userLanguage]: projectTitle },
              category: projectCategory.map(
                (value) =>
                  ({
                    0: "web",
                    1: "mobile",
                    2: "other",
                  }[value])
              ),
              tech: tech,
              status: projectStatus,
              detail: { [userState.user.userLanguage]: projectDetail },
              budget: projectBudget,
              start_at: projectStartAt,
              duration: projectDuration,
            },
          ],
        },
      })
      .then((response) => {
        if (uploadedFiles.length) {
          s3Upload(`project/${response.data}`, uploadedFiles).then((projectFiles) => {
            axios
              .put("v1/project/", {
                project: { project_id: response.data, project_info: [{ files: projectFiles }] },
              })
              .then(() => {
                setCurrentStep(2);
              });
          });
        } else setCurrentStep(2);
      });
  };

  const toSignup = () => {
    setCurrentStep(1);
    setProject({
      projectInfo: [
        {
          method: projectMethod,
          type: projectType,
          title: projectTitle,
          category: projectCategory.map(
            (value) =>
              ({
                0: "web",
                1: "mobile",
                2: "other",
              }[value])
          ),
          tech: tech,
          status: projectStatus,
          detail: projectDetail,
          budget: projectBudget,
          start_at: projectStartAt,
          duration: projectDuration,
        },
      ],
      uploadedFiles: uploadedFiles,
    });
  };

  return (
    <div
      style={{ height: "calc(100svh - 4rem)" }}
      className="fixed w-full h-full flex flex-col items-center bg-gray-100 overflow-hidden"
    >
      <div
        style={{ maxWidth: "1280px", height: "calc(100svh - 4rem)" }}
        className={`w-full flex overflow-hidden bg-white`}
      >
        <div className="flex border-x w-full">
          <LeftPanel
            sectionRefs={sectionRefs}
            registerPost={registerPost}
            toSignup={toSignup}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          <div style={{ height: "calc(100svh - 4rem)" }} className="w-full px-12 py-10 space-y-8 ml-80 overflow-y-auto">
            {currentStep === 0 ? (
              <ProjectInfoPanel
                projectTitle={projectTitle}
                setProjectTitle={setProjectTitle}
                projectTitleRef={projectTitleRef}
                projectDetail={projectDetail}
                setProjectDetail={setProjectDetail}
                projectDetailRef={projectDetailRef}
                projectMethod={projectMethod}
                setProjectMethod={setProjectMethod}
                projectMethodRef={projectMethodRef}
                projectType={projectType}
                setProjectType={setProjectType}
                projectTypeRef={projectTypeRef}
                projectCategory={projectCategory}
                setProjectCategory={setProjectCategory}
                projectCategoryRef={projectCategoryRef}
                projectStatus={projectStatus}
                setProjectStatus={setProjectStatus}
                projectStatusRef={projectStatusRef}
                tech={tech}
                setTech={setTech}
                techRef={techRef}
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                uploadedFilesRef={uploadedFilesRef}
                projectBudget={projectBudget}
                setProjectBudget={setProjectBudget}
                projectBudgetRef={projectBudgetRef}
                projectStartAt={projectStartAt}
                setProjectStartAt={setProjectStartAt}
                projectStartAtRef={projectStartAtRef}
                projectDuration={projectDuration}
                setProjectDuration={setProjectDuration}
                projectDurationRef={projectDurationRef}
              />
            ) : currentStep === 1 ? (
              <div className="flex justify-center">
                <Signup isAnon />
              </div>
            ) : (
              <JobPostComplete />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJobPost;
