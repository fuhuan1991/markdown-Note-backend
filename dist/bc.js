"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const { BUCKET_NAME, FOLDER_NAME } = config_1.default;
const s3 = new aws_sdk_1.default.S3();
function s3BucketUpload(s3, file) {
    // const buffer = file.data;
    // const stream = Readable.from(buffer.toString());
    // const name = getRandomFileName();
    // const params = {
    //   Bucket: BUCKET_NAME,
    //   Body: stream,
    //   Key: FOLDER_NAME + '/' + Date.now() + '_' + name + '_' + file.name,
    //   ACL: 'public-read',
    // };
    return new Promise((resolve, reject) => {
        var filePath = "./iris.jpeg";
        var params = {
            Bucket: BUCKET_NAME,
            Body: fs_1.default.createReadStream(filePath),
            Key: "images/" + Date.now() + "_" + path_1.default.basename(filePath)
        };
        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                console.log("Error", err);
                reject(err);
            }
            //success
            if (data) {
                console.log("Uploaded in:", data.Location);
                resolve(data);
            }
        });
        // s3.upload(params, function (err, data: S3_UPLOAD_RESPONSE) {
        //   //handle error
        //   if (err) {
        //     console.log(err);
        //     reject(err);
        //   }
        //   //success
        //   if (data) {
        //     console.log("Uploaded in:", data.Location);
        //     console.log(data);
        //     resolve(data);
        //   }
        // });
    });
}
exports.default = {
    s3BucketUpload: s3BucketUpload.bind(this, s3),
};
//# sourceMappingURL=bc.js.map