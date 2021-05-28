"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const getRandomFileName_1 = require("../util/getRandomFileName");
const { BUCKET_NAME, FOLDER_NAME } = config_1.default;
const s3 = new aws_sdk_1.default.S3();
function s3BucketUpload(s3, file) {
    console.log("--------incoming file:");
    console.log(file);
    // Only process image files
    if (!typeCheck(file.mimetype))
        return Promise.reject("Type error! Please upload a image file.");
    const buffer = file.data;
    const name = getRandomFileName_1.getRandomFileName();
    const params = {
        Bucket: BUCKET_NAME,
        Body: buffer,
        Key: FOLDER_NAME + '/' + Date.now() + '_' + name + '_' + file.name,
        ACL: 'public-read',
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log(err);
                reject(err);
            }
            //success
            if (data) {
                console.log(data);
                resolve(data);
            }
        });
    });
}
// check is MIME type is image
function typeCheck(mimetype) {
    const type = mimetype.split('/')[0];
    return type === 'image';
}
exports.default = {
    s3BucketUpload: s3BucketUpload.bind(this, s3),
};
//# sourceMappingURL=index.js.map