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
const filePath = "./iris.jpeg";
const st = fs_1.default.createReadStream(filePath);
var params = {
    Bucket: BUCKET_NAME,
    Body: st,
    Key: FOLDER_NAME + '/' + Date.now() + '_' + path_1.default.basename(filePath),
    ACL: 'public-read',
};
s3.upload(params, function (err, data) {
    //handle error
    if (err) {
        console.log("Error", err);
    }
    //success
    if (data) {
        console.log("Uploaded in:", data.Location);
        console.log(data);
    }
});
//# sourceMappingURL=index.js.map