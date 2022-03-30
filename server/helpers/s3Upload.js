const S3 = require("aws-sdk/clients/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv/config');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const s3 = new S3({
    region: process.env.S3_BUCKET_REGION,
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET_NAME,
        metadata: function (req, file, cb) {
            console.log(req.body)
            cb(null, { fieldName: file.fieldname });
            console.log('yes')
        },
        key: function (req, file, cb) {
            const isValid = FILE_TYPE_MAP[file.mimetype];
            let uploadError = new Error('invalid image type')
            console.log(isValid)

            if (isValid) uploadError = null;
            
            const extension = FILE_TYPE_MAP[file.mimetype];
            const rawName = file.originalname.split(`.${extension}`)[0];
            const fileName = `${rawName}-${Date.now()}.${extension}`
            cb(uploadError, fileName);
        }
    })
});

function s3UploadImg() {
    return upload.array('img', 5)
};

module.exports = {
    s3UploadImg
};