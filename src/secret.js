require('dotenv').config()

const serverPort = process.env.PORT || 8000;
const mongoDbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMernDB";
const defaultImgPath = process.env.IMG_PATH || "../public/images/users/default-img.png";

module.exports = {serverPort,mongoDbURL,defaultImgPath}