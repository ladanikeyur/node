import mongoose from "mongoose"




const Database = (dbLink) =>{
    mongoose.connect(dbLink).then((res) =>{
        console.log("Database Connect Successfully")
    })
}



export default Database