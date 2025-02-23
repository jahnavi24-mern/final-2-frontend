import api from './api';
import axios from 'axios';

const BASE_URL = "http://localhost:4000/api";

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

export const deleteForm = async (id) => {
    try {
        const response = await api.delete(`/form/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const shareForm = async (formId) => {
    try {
        const response = await axios.get(`${BASE_URL}/form/share/${formId}`);
        return response.data.sharedUrl;
    } catch (error) {
        console.error("Error sharing the form:", error);
        throw error;
    }
};

export const submitFormResponses = async (formId, userDetails, responses) => {
    return api.post(`/api/forms/${formId}/submit`, {
        name: userDetails.name,
        email: userDetails.email,
        responses: responses
    });
};