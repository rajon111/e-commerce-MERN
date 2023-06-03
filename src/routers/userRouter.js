const express = require('express');
const { getUserss, getUserById, deleteUserById } = require('../controllers/userController');
const userRouter = express.Router()



userRouter.get('/', getUserss)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id',deleteUserById )



module.exports = userRouter;