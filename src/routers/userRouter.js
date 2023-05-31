const express = require('express');
const { getUserss, getUser } = require('../controllers/userController');
const userRouter = express.Router()



userRouter.get('/', getUserss)
userRouter.get('/:id', getUser)


module.exports = userRouter;