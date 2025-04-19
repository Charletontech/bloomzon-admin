const AWS = require('aws-sdk');
const uuid = require('uuid');


// Configure AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });
  
  /**
   * Uploads a file to AWS S3.
   * @param {Buffer} fileBuffer - The file content as a buffer.
   * @param {string} fileName - The name of the file.
   * @param {string} contentType - The content type of the file.
   * @param {string} folder - The folder in the S3 bucket to upload the file to.
   * @returns {string} - The URL of the uploaded file.
   */
  async function uploadToS3(fileBuffer, fileName, contentType, folder) {
    // Generate a hash using timestamp as prefix
    const prefix = uuid.v4().substring(0, 12); 
  
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${folder}/${prefix}_${fileName}`, // Prefix the key with the hash and underscore
      Body: fileBuffer,
      ContentType: contentType
    };
  
    const s3UploadResponse = await s3.upload(params).promise();
    return s3UploadResponse.Location;
  }

module.exports = uploadToS3

