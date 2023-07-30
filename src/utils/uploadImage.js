import imageCompression from "browser-image-compression";
import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const S3_REGION = process.env.REACT_APP_REGION;
const S3_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const S3_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

AWS.config.update({
  accessKeyId: S3_ACCESS_KEY,
  secretAccessKey: S3_SECRET_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: S3_REGION,
});

export async function uploadImage(imageFile, myUserId) {
  const options = {
    maxSizeMB: 10,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    const reader = new FileReader();
    reader.addEventListener("load", () => {});
    reader.readAsDataURL(compressedFile);
    const path = `images/company/${myUserId}${Date.now()}.jpg`;
    const params = {
      ACL: "public-read",
      Body: compressedFile,
      Bucket: S3_BUCKET,
      Key: path,
    };

    try {
      myBucket
        .putObject(params)
        .on("httpUploadProgress", async (evt) => {})
        .send((err) => {
          if (err) console.log(err);
        });

      return `https://kookjein.s3.ap-northeast-2.amazonaws.com/${path}`;
    } catch {}
  } catch (error) {
    console.log(error);
  }
}
