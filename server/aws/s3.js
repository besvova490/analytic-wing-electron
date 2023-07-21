const { S3Client, ListObjectsCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");

const client = new S3Client({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
  }
});


async function downloadBucket(app, win, callback) {
  try {
    const { Contents } = await client.send(
      new ListObjectsCommand({ Bucket: process.env.REACT_APP_AWS_EXTENSION_BUCKET })
    );
  
    let fileSavePath = `${app.getPath("desktop")}/analytic-wing-extension`;
    win.setProgressBar(0);

    if (!fs.existsSync(fileSavePath)) {
      fs.mkdirSync(fileSavePath);
    }
  
    const promises = Contents.map(async ({ Key }, index) => {
      const command = new GetObjectCommand({
        Bucket: process.env.REACT_APP_AWS_EXTENSION_BUCKET,
        Key: Key
      });
      const data = await client.send(command);
      const file = fs.createWriteStream(`${fileSavePath}/${Key.replace("dist/", "")}`);

      data.Body.pipe(file);

      const progress = index / Contents.length;
      win.setProgressBar(progress);
    });
  
    await Promise.all(promises).then(() => callback && callback(fileSavePath)).finally(() => win.setProgressBar(-1));
  } catch (error) {
    console.log(error);
    win.setProgressBar(-1);
  }
}

module.exports = {
  downloadBucket,
  client
};
