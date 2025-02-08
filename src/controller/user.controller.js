// // to learn flow till line no 15

// import {asyncHandler} from '../utilis/asyncHandler.js'
// import express from 'express'
// const registerUser = asyncHandler(async (req,res)=>{
//     res.status(200).json({
//         message:"ok" ,
//         boss:"got u"
//     })

//     const {user ,email}=req.body
//     console.log("User: ",user)
//     console.log("email: ",email)
// })
// export {registerUser}

import {asyncHandler} from '../utilis/asyncHandler.js'
import { ApiError } from '../utilis/ApiError.js'
import {User} from '../model/user.model.js'
import mongoose from 'mongoose'
import {uploadOnCloudnary} from '../utilis/cloudnary.js'
import {ApiResponse} from '../utilis/ApiResponse.js'
const registerUser = asyncHandler( async(req,res)=>{
    // getUserDetail from client
    // validation: !empty
    // check user is already exist or not
    // if not; then add file 
    // upload coverImg and avtar on cloudnary and check
    // create user object - on mongodb 
    // remove passs and responseToken field from response
    // check for user creation and return response 

    const {fullName , userName , password, email} = req.body
    if([fullName, userName,email, password].some(field=>field?.trim()==="")){
            throw new ApiError(400,"All field are required!")
    }

    const existedUser =await User.findOne({
        $or:[{userName} ,{email} ]
    })

    if(existedUser) throw new ApiError("User with email or userName is already exist!");

    const avatarLocalPath = req.files?.avatar[0]?.path() //files come by multer middleware bcz it give by default by multer and .path give localFilePath
    console.log("file detail: ",req.files)
    console.log("file detail2: ",req.files.avatar[0])
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files?.coverImg )&&req.files.coverImg.length>0) {
        coverImageLocalPath=req.files?.CoverImg[0].path
    }
    if(!avatarLocalPath) throw new ApiError(408,"Avtar file is required!");
    const avtar= await uploadOnCloudnary(avatarLocalPath)
    const coverImg = await uploadOnCloudnary(coverImageLocalPath)

    if(!avtar)throw new ApiError(408,"Avtar file is required!");

    const user=User.create({
        fullName,
        avtar:avtar.url,
        coverImg:coverImg?.url || "" ,
        email ,
        password ,
        userName:userName.toLowerCase()
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) throw new ApiError(500,"SomeThing went wrong while registering the user");

    return res.status(201).json(
        new ApiResponse(200 , createdUser , "User registered Successfull! ")
    )
} )