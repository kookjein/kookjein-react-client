import React, {useEffect, useState} from "react";
import CreateJobPost from "./CreateJobPost";

const CreateJobPostAnon = () => {
  const [project, setProject] = useState(null)

  useEffect(()=>{
      console.log(project)
  }, [project])

  return (
    <div className="flex">
      <div className="w-64 h-screen bg-red-100 flex-shrink-0">
        <p>1. 프로젝트 등록</p>
        <p>2. 회원가입</p>
        <p>2. 프로젝트 등록 완료</p>
      </div>
      <CreateJobPost setProject={setProject}/>
    </div>
  );
};

export default CreateJobPostAnon;
