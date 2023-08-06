import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import DefaultImage from "../assets/default-company.png";
import { useState } from "react";

const UploadCompanyLogo = ({ width, height, borderRadius, setImage, image }) => {
  const [currentImage, setCurrentImage] = useState(image);

  async function onChangePicture(e) {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setCurrentImage(URL.createObjectURL(imageFile));
      setImage(imageFile);
    }
  }

  return (
    <div style={{ width: width, height: height, borderRadius: borderRadius }} className="group bg-gray-100">
      <div
        style={{ width: width, height: height, borderRadius: borderRadius }}
        onChange={(e) => console.log(e)}
        className="absolute opacity-0 group-hover:opacity-100 flex items-center justify-center flex-shrink-0 z-20 hover:cursor-pointer group-hover:bg-black transition group-hover:bg-opacity-30 space-x-2"
      >
        <AiOutlineEdit className="w-7 h-7 text-white cursor-pointer" />
        <div className="absolute flex items-center w-full h-full flex-shrink-0 z-30 cursor-pointer overflow-hidden">
          <input
            id="companyPic"
            style={{ width: width, height: height, opacity: 0, borderRadius: borderRadius }}
            className="text-4xl cursor-pointer "
            type="file"
            onChange={onChangePicture}
            accept="image/*"
          />
        </div>
      </div>
      <img
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = DefaultImage;
        }}
        style={{ width: width, height: height, borderRadius: borderRadius }}
        src={currentImage || DefaultImage}
        alt=""
        draggable={false}
        className="hover:cursor-pointer object-cover h-full w-full border"
      />
    </div>
  );
};

export default UploadCompanyLogo;
