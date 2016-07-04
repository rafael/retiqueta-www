var webpack = require('webpack');
var config = require('./config');
var S3Plugin = require('webpack-s3-plugin');

config.plugins.push(
  new S3Plugin({
    include: /.*/,
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    },
    s3UploadOptions: {
      Bucket: process.env.AWS_BUCKET,
      ACL: 'public-read'
    }
  })
);

module.exports = config
