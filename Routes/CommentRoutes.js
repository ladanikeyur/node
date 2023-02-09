import express from 'express'
import { CommentAdd, deleteComment, editComment, getUserComment } from '../MidalWares/CommentMiddleware.js'
import tokenVarify from '../MidalWares/Tokenvarify.js'

const commentrouter = express.Router()


commentrouter.post('/addComment',tokenVarify,CommentAdd)
commentrouter.get('/getAllComment', tokenVarify, getUserComment)
commentrouter.delete('/commentDelete',tokenVarify,deleteComment)
commentrouter.patch('/commentEdit',tokenVarify,editComment)

export default commentrouter