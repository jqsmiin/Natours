const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')

const { getAllUsers, createUser, getUser, updateUser, deleteUser, updateMe, deleteMe, getMe, uploadUserPhoto, resizeUserPhoto } = userController
const { signup, login, forgotPassword, resetPassword, protect, updatePassword, restrictTo, logout } = authController

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.get('/logout', logout)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/resetPassword/:token', resetPassword)

userRouter.get('/me', protect, getMe, getUser)
userRouter.patch('/updateMyPassword', protect, updatePassword)
userRouter.patch('/updateMe', protect, uploadUserPhoto, resizeUserPhoto, updateMe)
userRouter.delete('/deleteMe', protect, deleteMe)

// protect all routes after this midd
userRouter.use(protect)
userRouter.use(restrictTo('admin'))

userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = userRouter