import { deleteDoc, GetPostData, PostInsert, UpdateDocsss } from "../Schima/PostSchima.js"


const getAllData = (req, res) => {
    try {
        GetPostData('').then((r) => {
            res.send(r)
        })
    } catch (error) {
        console.log(error)
    }
}


const getData = (req, res) => {
    console.log(req.body.id)
    try {
        GetPostData(req.body.id).then((r) => {
            res.send(r)
        })
    } catch (error) {
        console.log(error)
    }
}

const addPost = (req, res) => {
    try {
        PostInsert(req.body.name, req.body.Discription, req.body.image).then((r) => {
            res.send("Pose Addes Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}


const upDatePost = (req, res) => {
    try {
        UpdateDocsss(req.body.id, req.body.name, req.body.Discription).then((r) => {
            res.send("Post Update Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}

const deletePost = (req, res) => {
    try {
        deleteDoc(req.body.id).then((r) => {
            res.send("Post Delete Successfully")
        })
    } catch (error) {
        console.log(error)
    }
}



export { getAllData, getData, addPost, upDatePost, deletePost }