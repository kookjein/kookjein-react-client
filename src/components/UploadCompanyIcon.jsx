import React, { useContext } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import DefaultImage from "../assets/default-company.png";
import AWS from "aws-sdk";
import imageCompression from "browser-image-compression";
import { AuthContext } from "../utils/authContext";

const UploadCompanyIcon = ({ width, height, borderRadius, companyInfo, setImage, image }) => {
  const { userState } = useContext(AuthContext);
  const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
  const S3_REGION = process.env.REACT_APP_REGION;
  const S3_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const S3_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
  const myUserId = userState.user.userId;

  AWS.config.update({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: S3_REGION,
  });

  async function onChangePicture(e) {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
      console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);
        console.log("compressedFile instanceof Blob", compressedFile instanceof Blob); // true
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

        const reader = new FileReader();
        reader.addEventListener("load", () => {});
        reader.readAsDataURL(compressedFile);
        const path = `images/company/${myUserId}${Date.now()}.jpg`;
        uploadFile(path, compressedFile);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function uploadImageToServer(imagePath) {
    // ===== TODO: 서버 axios로 post 부르기 ===== //
    // axios
    //   .post(`/v1/user/me`, { user: { user_img: imagePath, user_profile: [{ img: imagePath }] } })
    //   .then((response) => {
    //     companyInfo.current = response.data.user.user_profile[0];
    //     setAccessToken(response.data.access_token.access_token);
    //   })
    //   .catch((error) => {
    //     console.log("CHANGE IMAGE ERROR: ", error);
    //   });

    // companyInfo.current = {
    //   ...companyInfo.current,
    //   ...{ company: { company_info: [{ ...companyInfo.current?.company.company_info[0], img: imagePath }] } },
    // };
    setImage(imagePath);
    console.log(companyInfo.current);
  }

  const uploadFile = (key, file) => {
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: key,
    };
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        uploadImageToServer(`https://kookjein.s3.ap-northeast-2.amazonaws.com/${key}`);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  return (
    <div style={{ width: width, height: height, borderRadius: borderRadius }} className="group bg-gray-100">
      <div
        style={{ width: width, height: height, borderRadius: borderRadius }}
        className="absolute opacity-0 group-hover:opacity-100 flex items-center justify-center flex-shrink-0 z-20 hover:cursor-pointer group-hover:bg-black transition group-hover:bg-opacity-30 space-x-2"
      >
        <AiOutlineEdit className="w-7 h-7 text-white cursor-pointer" />
        <div className="absolute flex items-center w-full h-full flex-shrink-0 z-30 cursor-pointer overflow-hidden">
          <input
            id="profilePic"
            style={{ width: width, height: height, opacity: 0, borderRadius: borderRadius }}
            className="text-4xl cursor-pointer "
            type="file"
            onChange={onChangePicture}
            accept="image/png, image/gif, image/jpeg, image/jpg"
          />
        </div>
      </div>
      <img
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = DefaultImage;
        }}
        style={{ width: width, height: height, borderRadius: borderRadius }}
        src={image || DefaultImage}
        alt=""
        draggable={false}
        className="hover:cursor-pointer object-cover h-full w-full border"
      />
    </div>
  );
};

export default UploadCompanyIcon;
