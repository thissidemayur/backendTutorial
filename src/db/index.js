import mongoose from 'mongoose'
import {DB_NAME} from '../constants.js'
// mongodb+srv://thissidemayur:<db_password>@cluster0.xmmhy.mongodb.net/
const dbConnection = async () =>{
    try{
        await mongoose.connect(`${process.env.MONGOODB_URL}/${DB_NAME}`);
    }
    catch (error){
        console.log("Error at index.js of db directory: ",error);
        process.exit(1);
    }
}

export default dbConnection;