import express from 'express'
import { AddUser, deleteUsers, forgotePasswords, getCurrentUserdetails, loginUsers, Otpverifys, sendOtps } from '../MidalWares/RagistarUser.js'


const userRouter = express.Router()


userRouter.post('/userRegister',AddUser)
userRouter.delete('/userdelete',deleteUsers)
userRouter.post('/userlogin',loginUsers)
userRouter.patch('/userForgotePassword',forgotePasswords)
userRouter.post('/emailverify',sendOtps)
userRouter.post('/otpverify',Otpverifys)
userRouter.get('/getCurrentUserdetails',getCurrentUserdetails)


export default userRouter