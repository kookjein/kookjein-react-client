import React from "react";
import Navbar2 from "../components/Navbar2";

const DeveloperProfile = () => {
  return (
    <div className="w-full h-full flex flex-col items-center min-h-screen overflow-x-hidden">
      <Navbar2 light />
      <div
        style={{ maxWidth: "1280px" }}
        className="w-full h-full px-4 flex-shrink-0"
      >DEVELOPER PROFILE</div>
    </div>
  );
};

export default DeveloperProfile;
