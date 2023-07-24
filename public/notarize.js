const { notarize } = require("@electron/notarize");
require("dotenv").config();

console.log("notarize.js", { appleId: process.env.APPLE_ID, appleIdPassword: process.env.APPLE_ID_PASSWORD });

exports.default = async function notarizing(context) {
  if (process.platform !== "darwin") {
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appDir = context.appOutDir;

  return await notarize({
    appBundleId: "com.analyticwing.app",
    appPath: `${appDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  });
};
