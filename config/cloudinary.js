const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImg = (img)=>{
    return new Promise((resolve, reject)=>{
         const result = cloudinary.uploader.upload_stream(
            {resource_type: "image" },
            (error, result)=>{
                if(result){
                    resolve(result);
                }

                else{
                    reject(error);
                }
                
            }
         ).end(img.buffer);
    });
}

const uploadToCloudinary = async (file) => {

    try {
        const result = await uploadImg(file);
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw error;
    }
};

module.exports = {uploadToCloudinary};
