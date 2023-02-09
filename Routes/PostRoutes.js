import express from 'express'
import { addPost, deletePost, getAllData, getData, upDatePost } from '../MidalWares/PostModlewares.js'
import tokenVarify from '../MidalWares/Tokenvarify.js'


const Postrouter = express.Router()
Postrouter.get('/getAllPost', tokenVarify, getAllData)
Postrouter.get('/getPost', tokenVarify, getData)
Postrouter.post('/addPost', tokenVarify, addPost)
Postrouter.patch('/upDatePost', tokenVarify, upDatePost)
Postrouter.delete('/deletePost', tokenVarify, deletePost)

export default Postrouter