import { apiConnector } from "./apiConnector";

export const postComment = async(method, url, formData) => {
    const response = await apiConnector(method, url, formData);
    if(!response.data.success)
        throw new Error(response.data.message); 
};
export const fetchComments = async(method, url) => {
    const response = await apiConnector(method, url);
    if(!response.data.success)
            throw new Error(response.data.message);
        
    return response.data.data;
};