import config from '../config';
import AWS from 'aws-sdk';
import { getRandomFileName } from '../util/getRandomFileName';

interface S3_UPLOAD_RESPONSE {
  ETag: string,
  Location: string,
  key: string,
  Key: string,
  Bucket: string,
}

interface INCOMING_FILE {
  name: string,
  data: Buffer,
  size: number,
  encoding: string,
  tempFilePath: string,
  truncated: boolean,
  mimetype: string,
  md5: string,
  mv: Function,
}

const { BUCKET_NAME, FOLDER_NAME } = config;
const s3 = new AWS.S3();

function s3BucketUpload(s3, file: INCOMING_FILE): Promise<S3_UPLOAD_RESPONSE>  {
  console.log("--------incoming file:");
  console.log(file)

  // Only process image files
  if (!typeCheck(file.mimetype)) return Promise.reject("Type error! Please upload a image file.");
  
  const buffer = file.data;
  const name = getRandomFileName();
  const params = {
    Bucket: BUCKET_NAME,
    Body: buffer,
    Key: FOLDER_NAME + '/' + Date.now() + '_' + name + '_' + file.name,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {

    s3.upload(params, function (err, data: S3_UPLOAD_RESPONSE) {
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
function typeCheck(mimetype: string): boolean {
  const type = mimetype.split('/')[0];
  return type === 'image';
}

export default {
  s3BucketUpload: s3BucketUpload.bind(this, s3),
}