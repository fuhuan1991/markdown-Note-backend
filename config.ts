const PORT = 3000;

const AWSConfig = {
  region: "us-east-1",
  endpoint: "https://dynamodb.us-east-1.amazonaws.com",
};

const BUCKET_NAME = "md-note-bucket";
const FOLDER_NAME = "images";
const UPLOAD_FILE_NAME_IN_REQUEST = "upload";

export default {
  PORT: PORT,
  AWSConfig: AWSConfig,
  BUCKET_NAME: BUCKET_NAME,
  FOLDER_NAME: FOLDER_NAME,
  UPLOAD_FILE_NAME_IN_REQUEST: UPLOAD_FILE_NAME_IN_REQUEST,
}
