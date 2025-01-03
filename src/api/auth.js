import axios from "axios";

const baseURL = "http://localhost:4000/api";

import api from './api';

export const signin = async ({email, password}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/signin`, { email, password });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const signup = async ({userName, email, password, confirmPassword}) => {
    try{
        const response = await axios.post(`${baseURL}/auth/signup`, { userName, email, password, confirmPassword });
        return response.data;
    } catch (error) {
        console.log(error, "error");
    }
}

export const getUserDetails =  async () => {
    try {
        const response = await api.get("/auth/profile");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}