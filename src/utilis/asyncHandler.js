// 2 way
import {ApiError} from './ApiError.js'

const asyncHandler = (requestHandler) =>{
    return (req,res,next)=> Promise.resolve(requestHandler(req,res,next))
    .catch((error)=> {
        next(error)
    })
}

export  {asyncHandler}

////    2nd way
// const asynchandler = async (requestHandler) =>{
//     try {
//         return requestHandler(req,res,next)
//     } catch (error) {
//          throw new ApiError(501, error?.message || "Invalid access token")
//     }
// }
// export  {asyncHandler}
