const s3 = require('s3');
const path = require('path');
let credentials;
try {
  credentials = require('../.aws_credentials.json');
} catch (err) {
  console.error('Credentials required at .aws_credentials.json!');
  process.exit(1);
}

const client = s3.createClient({
  s3Options: Object.assign({}, credentials)
});

const uploader = client.uploadDir({
  localDir: path.resolve(__dirname, '../dist'),
  deleteRemoved: true,
  s3Params: {
    Bucket: 'epochalypsenow'
  }
});

uploader.on('error', err => {
  console.error('unable to sync:', err.stack);
});
uploader.on('progress', () => {
  console.log('progress', uploader.progressAmount, uploader.progressTotal);
});
uploader.on('end', () => {
  console.log('done uploading');
});
