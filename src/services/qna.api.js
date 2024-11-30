import { apiConnector } from "./apiConnector";

export const postQuestion = async(method, url, formData, navigate) => {
    const response = await apiConnector(method, url, formData);
    if(!response.data.success)
        throw new Error(response.data.message);
    navigate("/");
};

export const fetchQuestion = async(method, url) => {
    const response = await apiConnector(method, url);
    if(!response.data.success)
        throw new Error(response.data.message);
    return response.data.data;
};

export const deleteQuestion = async (method, url, formData, navigate) => {
    const response = await apiConnector(method, url, formData);
    if(!response.data.success)
        throw new Error(response.data.message);
    navigate("/")
    return;
}

export const approveQuestion = async(method, url, body) => {
    const response = await apiConnector(method, url, body);
    if(!response.data.success)
        throw new Error(response.data.message);
    return;
};