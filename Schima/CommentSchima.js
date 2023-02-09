import mongoose from "mongoose";



const CommentData = new mongoose.Schema({
    comment:{type:String,require:true},
    date:{type: String, require: false},
    post:{type:String,ref:"LinkdinPost"}
})

const commentModal = mongoose.model("Comment",CommentData)

const addComment = async (postId, com) => {
    try {
        const commentDoc = new commentModal({
            comment:com,
            date: new Date(),
            post:postId
        })
        const res = await commentDoc.save()
    } catch (error) {
        console.log(error)
    }
}


const getUserAllComment = async () =>{
    const result = await commentModal.find().populate("post")
    return result
}


const deleteCommentMiddleware = async (id) =>{
    const result = await commentModal.findByIdAndDelete(id)
}


const editCommentMiddleware = async (id,comment) =>{
    const result = await commentModal.findByIdAndUpdate({_id:id},{comment:comment})
}

export {addComment,getUserAllComment,deleteCommentMiddleware,editCommentMiddleware}
