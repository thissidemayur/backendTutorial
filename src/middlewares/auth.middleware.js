import {asyncHandler} from '../middlewares/auth.middleware.js'
import { User } from '../model/user.model.js';
import { ApiError } from '../utilis/ApiError.js';
import jwt from 'jsonwebtoken'


export const verifyJWT = asyncHandler(async(req, res,next )=>{
    /*
    1. get access token from the cookies,
    2. verify the access token than extract user._id from there 
    3. add userDetail on the req.object with userValues  
    */

    try {
        const token= await req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","");
    
        if(!token) throw new ApiError(401, "unAuthorized request!");
        console.log("Token :",token);
    
        const decodedToken= jwt.verify(token,process.env.JSON_ACCESS_TOKEN_SECRET);
        if(!decodedToken) throw new ApiError(401, "Unauthorized request at decoding token")
    
        const user=User.findById(decodedToken._id).select("-password -refreshToken")
        console.log("User from Auth.middleware: ",user);
    
        if(!user) throw new ApiError(401,"Invalid access token")
    
        req.user=user;
        next()

    } catch (error) {
        throw new ApiError(401 , error?.message || "Invalid access token")
    }





        

        



})