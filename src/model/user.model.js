import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    userName:{
        type:String ,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true,
    } ,
    email:{
        type:String ,
        required:true,
        unique:true,
        lowercase:true,
        index:true,
        trim:true,
    } ,
    password:{
        type:String ,
        required:true,

    } ,
    fullName:{
        type:String ,
        required:true,
        lowercase:true,
        index:true,
        trim:true,
    } ,
    avtar:{
        type:String ,// from cloudnay url
        required:true
    } ,
    coverImg:{
        type:String ,// from cloudnay url
        required:true
    } ,
    watchingHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    } ,
    refreshToken:{
        type:true
    }

},
{timestamps:true}
);


// convert password into hash without saving in db
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

// now check given password is correct or not 
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//
userSchema.methods.generateAccessToken= function (){
    return jwt.sign({
        _id:this._id,
        userName:this.userName,
        email:this.email,
        fullName:this.fullName
      }, 
      process.env.JSON_ACCESS_TOKEN_SECRET,
    { 
        expiresIn: process.token.ACCESS_TOKEN_EXPIRY
     }
    );
}
// generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.Model("User",userSchema)

