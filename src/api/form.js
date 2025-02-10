import api from './api';

export const createFlow =  async (title, folderId, flow) => {
    try {
        const response = await api.post("/form/create", {
            title: title,
            folderId: folderId,
            flow: flow
        });
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getForms = async () => {
    try {
        const response = await api.get("/form");
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const getFormById = async (id) => {
    try {
        const response = await api.get(`/form/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}