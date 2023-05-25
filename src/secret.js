require('dotenv').config()

const serverPort = process.env.PORT || 8000;
const mongoDbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/eCommerceMernDB"

module.exports = {serverPort,mongoDbURL}