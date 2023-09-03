import React, { useEffect, useState } from "react";
import axios from "../utils/authAxios";

const Admin = () => {
  const [usersArray, setUsersArray] = useState([]);
  useEffect(() => {
    axios
      .get(`/v1/user/all`)
      .then((response) => {
        console.log(response.data);
        setUsersArray(response.data);
      })
      .catch((e) => {});
    return () => {};
  }, []);
  return (
    <div className="w-full h-full flex flex-col items-center overflow-x-hidden bg-gray-100">
      <div
        style={{ maxWidth: "1280px", scrollbarWidth: 0, minHeight: "calc(100svh - 10rem)" }}
        className="w-screen sm:w-full h-full flex-shrink-0 sm:justify-around px-4 pb-24 pt-16"
      >
        <div className="mb-4 font-bold text-lg">TOTAL COUNT: {usersArray.length}</div>
        <div className="flex">
          <div className="w-1/2 space-y-8">
            <div>DEVELOPER COUNT: {usersArray.filter((item, idx) => item.user_type === "employee").length}</div>
            <div>
              {usersArray
                .filter((item, idx) => item.user_type === "employee")
                .map((item) => (
                  <div className="flex space-x-2">
                    <div className="w-12">{item.user_id}</div>
                    <div>{item.user_name}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-1/2 space-y-8">
            <div>CLIENT COUNT: {usersArray.filter((item, idx) => item.user_type === "employer").length}</div>
            <div>
              {usersArray
                .filter((item, idx) => item.user_type === "employer")
                .map((item) => (
                  <div className="flex space-x-2">
                    <div className="w-12">{item.user_id}</div>
                    <div>{item.user_name}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
