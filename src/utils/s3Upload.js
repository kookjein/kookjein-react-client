import AWS from "aws-sdk"

const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const S3_REGION = process.env.REACT_APP_REGION;
const S3_ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const S3_SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

AWS.config.update({accessKeyId: S3_ACCESS_KEY, secretAccessKey: S3_SECRET_KEY});
const myBucket = new AWS.S3({params: {Bucket: S3_BUCKET}, region: S3_REGION});

export const s3Upload = (key, files) => {
    const ret = []
    return new Promise((resolve, reject) => {
        const uploadPromises = files.map((file) => {
            return new Promise((resolveUpload, rejectUpload) => {
                const params = {ACL: "public-read", Body: file, Bucket: S3_BUCKET, Key: `${key}/${file.name}`};
                myBucket
                    .putObject(params)
                    .on("httpUploadProgress", (evt) => {
                        ret.push(`https://kookjein.s3.ap-northeast-2.amazonaws.com/${key}/${file.name}`)
                        resolveUpload()
                    })
                    .send((err) => {
                        if (err) console.log(err);
                    });
            });
        })
        Promise.all(uploadPromises).then(() => {
            resolve(ret);
        }).catch((reason) => {
            reject(reason);
        });

    })
}
