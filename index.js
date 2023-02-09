import express from "express";
import Database from "./Database.js";
import cors from 'cors';
import Postrouter from "./Routes/PostRoutes.js";
import commentrouter from "./Routes/CommentRoutes.js";
import userRouter from "./Routes/UserRoute.js";
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8000
const DBLINK = process.env.DBLINK || "mongodb://localhost:27017/Linkdin"
app.use(express.json());
app.use(cors())
Database(DBLINK)
app.use('/linkdin',Postrouter)
app.use('/linkdin/comment',commentrouter)
app.use('/linkdin/user',userRouter)

app.listen(PORT,() =>{
    console.log('Server Start...')
})