require("dotenv").config();

const serverPort = process.env.PORT || 8000;
const mongoDbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMernDB";
const defaultImgPath =
  process.env.IMG_PATH || "../public/images/users/default-img.png";
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || 'dfhiw4dru3eriif0309tj4';
module.exports = { serverPort, mongoDbURL, defaultImgPath,jwtActivationKey};
