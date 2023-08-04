import React, { useContext } from "react";
import { Link } from "react-router-dom";
import EmptyFile from "../assets/empty-file.png";
import { AuthContext } from "../utils/authContext";
import DefaultImage from "../assets/default-profile.png";
import DefaultCompany from "../assets/default-company.png";
import ProjectCell from "../components/ProjectCell";

const ClientMain = () => {
  const { userState } = useContext(AuthContext);

  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center overflow-x-hidden">
      <div style={{ maxWidth: "1000px" }} className="w-full h-full p-4 py-8 pb-24">
        <h1 className="text-2xl font-bold">내 대시보드</h1>

        <div className="h-12 w-full flex justify-end space-x-4 text-sm">
          <Link to={"/browse-jobs"}>
            <button className="h-9 px-6 text-green-700 rounded hover:brightness-125">전체 프로젝트</button>
          </Link>
          <Link to={"/post-job/flow-1"}>
            <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125">프로젝트 등록</button>
          </Link>
        </div>
        <div className="flex space-x-6">
          <div className="mt-4 w-full border rounded-xl py-6">
            <div className="w-full items-center border-b pb-3">
              <h1 className="text-lg font-bold mx-6">내 프로젝트</h1>
            </div>
            <div className="py-4">
              <ProjectCell />
            </div>

            <div className="flex flex-col flex-shrink-0 items-center justify-center space-y-6 py-6">
              <img src={EmptyFile} alt="" className="w-32" />
              <div className="flex flex-col items-center space-y-1">
                <p className="text-lg font-bold">진행중인 프로젝트가 없습니다</p>
                <p className="text-sm">프로젝트를 등록하면 여러 개발자들이 지원할 수 있습니다.</p>
              </div>

              <Link to={"/post-job/flow-1"}>
                <button className="h-9 px-6 bg-green-700 text-white rounded hover:brightness-125 text-sm">
                  프로젝트 등록
                </button>
              </Link>
            </div>
          </div>

          <div className="w-64 flex-shrink-0">
            <div className="mt-4 w-full border rounded-xl flex-shrink-0 flex flex-col items-center p-6">
              <Link to={`/user/${userState.user.userId}`}>
                <div className="flex flex-col items-center group">
                  <img
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = DefaultImage;
                    }}
                    src={DefaultImage}
                    alt=""
                    draggable={false}
                    className="w-16 h-16 bg-gray-100 rounded-full mb-4"
                  />
                  <p className="text-lg group-hover:text-green-600 group-hover:underline">Andrew Jang</p>
                  <p className="text-xs line-clamp-1 text-gray-600">
                    안녕하세요 남산컴퍼니 / 국제인 대표 장동해입니다.
                  </p>
                </div>
                <div className="w-full mt-6 text-sm text-green-700 font-bold">
                  <p>프로필을 완료하세요</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-full h-1 rounded-full bg-gray-300">
                      <div className="w-1/2 h-full bg-green-700"></div>
                    </div>
                    <p className="text-xs font-normal text-gray-600">50%</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="mt-4 w-full border rounded-xl flex-shrink-0 p-6">
              {false ? (
                <>
                  <Link to={"/create-company"}>
                    <button className="h-9 px-6 bg-green-600 text-white rounded-full hover:brightness-125 w-full text-sm">
                      기업 등록
                    </button>
                  </Link>
                  <div className="w-full mt-6 text-sm text-green-700 font-bold">
                    <p>기업 프로필을 완료하세요</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-full h-1 rounded-full bg-gray-300">
                        <div className="w-0 h-full bg-green-700"></div>
                      </div>
                      <p className="text-xs font-normal text-gray-600">0%</p>
                    </div>
                  </div>
                </>
              ) : (
                <Link to={`/company/${userState.user.userId}`}>
                  <div className="flex items-center group space-x-3">
                    <img
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = DefaultCompany;
                      }}
                      src={DefaultCompany}
                      alt=""
                      draggable={false}
                      className="w-12 h-12 bg-gray-100 rounded-full flex-shrink-0"
                    />
                    <div className="">
                      <p className="group-hover:text-green-600 group-hover:underline">국제인</p>
                      <p className="text-xs line-clamp-1 text-gray-600">국제 HR 플랫폼</p>
                    </div>
                  </div>
                  <div className="w-full mt-6 text-sm text-green-700 font-bold">
                    <p>기업 프로필을 완료하세요</p>
                    <div className="flex items-center space-x-3">
                      <div className="w-full h-1 rounded-full bg-gray-300">
                        <div className="w-1/2 h-full bg-green-700"></div>
                      </div>
                      <p className="text-xs font-normal text-gray-600">50%</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMain;
