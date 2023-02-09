import { addComment, deleteCommentMiddleware, editCommentMiddleware, getUserAllComment } from "../Schima/CommentSchima.js"

const CommentAdd = (req, res) => {
    try {
        addComment(req.body.post, req.body.comment)
        res.send("Comment Add Sucessfully")
    } catch (error) {
        console.log(error)
    }
}

const getUserComment = (req, res) => {
    try {
        getUserAllComment().then((data) => { res.send(data) })
    } catch (error) {

    }
}


const deleteComment = (req,res) =>{
    try {
        deleteCommentMiddleware(req.body.id).then((r) =>{res.send("Comment Delete SuccessFully")})
    } catch (error) {
        console.log(error)
    }
}


const editComment = (req,res) =>{
    try {
        editCommentMiddleware(req.body.id,req.body.comment)
        res.send("Comment edit SuccessFully")
    } catch (error) {
        console.log(error)
    }
}


export { CommentAdd, getUserComment,deleteComment,editComment }