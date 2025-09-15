import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";


const uploadImage = async (file) => {
    const formData = new FormData();

    // append expects the file field to be named "image"
    formData.append("image", file);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data; // Assuming the response contains the image URL
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error; // Re-throw the error for further handling if needed
    }
}

export default uploadImage;