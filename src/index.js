
import express from 'express'
import dotenv from 'dotenv'
import dbConnection from './db/index.js'

dotenv.config({
    path:'./.env'
})
const app=express()
const port=process.env.PORT || 8000;
dbConnection()
.then(()=>{
    app.listen(port ,()=>{
        console.log(`⚙️ Server is running at port : ${port}`);
    })
    app.on("error",(error)=>{
        console.log("Error at dbConnection fn execution at index.js file!:",error)
    })
})
.catch((error)=>{
    console.log("MongoDb Connection failed at index.js file!:",error)
})





// // 2 ways to connect db one is directly in index.js other is using file in db
// import mongoose from 'mongoose'
// import {DB_NAME} from './constants'
// ;(async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONODB_URL}/${DB_NAME}`);
//         app.on("error",(error)=>{
//             console.log("Error at db connection of index.js: ",error)
//         });
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening the PORT: ${process.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("ERROR: ", error)
//         throw error;
//     }

// }) ();