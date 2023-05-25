const app = require("./app");
const connectDB = require("./config/db");
const { serverPort } = require("./secret");


app.listen(serverPort, async() => {
  console.log(`Server is listening on port ${serverPort}`)
  await connectDB()
})
