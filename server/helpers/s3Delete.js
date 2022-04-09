require("dotenv/config");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

export function s3Delete(deleteParams) {

  let params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: "myfolder/",
  };
  let deleteParams = "";
  if (Array.isArray(deleteParams)) {
    deleteParams = deleteUrls(deleteParams);
  } else {
    deleteParams = deleteUrls([deleteParams]);
  }
  params.Delete = {
    Objects: deleteParams,
  };
  s3.deleteObjects(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      throw new Error(err);
    }
  });
}

function deleteUrls(arrUrls) {
  const deleteParams = [];
  arrUrls.forEach((url) => {
    url = url.split(
      "https://real-estate-upload-bucket.s3.eu-central-1.amazonaws.com/"
    );
    deleteParams.push({ Key: url[1] });
  });
  return deleteParams;
}