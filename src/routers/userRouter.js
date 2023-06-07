const express = require('express');
const { getUserss, getUserById, deleteUserById, processRegister } = require('../controllers/userController');
const userRouter = express.Router()



userRouter.post('/process-register', processRegister)
userRouter.get('/', getUserss)
userRouter.get('/:id', getUserById)
userRouter.delete('/:id',deleteUserById )



module.exports = userRouter;