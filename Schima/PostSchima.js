import mongoose from "mongoose";



const PostData = new mongoose.Schema({
    name: { type: String, require: true },
    Discription: { type: String, require: true },
    image: { type: String, require: true },
    date: { type: String, require: false }
})


const PostModel = mongoose.model("LinkdinPost", PostData)


const PostInsert = async (name, Dis, img) => {
    try {
        const PostDoc = new PostModel({
            name: name,
            Discription: Dis,
            image: img,
            date: new Date()
        })
        const res = await PostDoc.save()
    } catch (error) {
        console.log(error)
    }
}


const GetPostData = (id) => {
    try {
        if (id === "") {
            return PostModel.find()
        } else {
            return PostModel.findById(id)
        }
    } catch (error) {
        console.log(error)
    }
}


const UpdateDocsss = async (id, name, Discription) => {
    try {
        const result = await PostModel.updateOne({ _id: id }, { name: name, Discription: Discription })
        return result
    } catch (error) {
        console.log(error)
    }
}

const deleteDoc = async (id) => {
    try {
        const result = await PostModel.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log(error)
    }
}

export { PostInsert, GetPostData, UpdateDocsss, deleteDoc }