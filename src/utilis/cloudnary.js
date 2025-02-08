import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
    api_key: process.env.CLOUDNARY_API_KEY, 
    api_secret: process.env.CLOUDNARY_API_SECRET
});

async function uploadOnCloudnary(localFilePath) {
    try {
        if(!localFilePath) return null;
            const response=await cloudinary.uploader.upload(localFilePath ,{
                resource_type:"auto"
            })
        
        // file has been uploaded successfull
        console.log("response: ", response);
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlink(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
    
}
export {uploadOnCloudnary}