class ApiError extends Error {
    constructor(
        statusCode ,
        message="Something went wrong on ApiError file!",
        error=[],
        stack=""
    ){
        this.statusCode=statusCode 
        this.message=message
        this.error=error
        this.sucess=false
        this.data=null

        if(stack) this.stack=stack
        Error.captureStackTrace(this,this.constructor)
    }
}

export {ApiError}