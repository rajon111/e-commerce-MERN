
const express = require('express');
const getUserss = require('../controllers/userController');
const userRouter = express.Router()



userRouter.get('/', getUserss)


module.exports = userRouter;