import api from './api';

export const createFolder =  async (workspaceId, folderName) => {
    try {
        const response = await api.post("/folder/create", {
            workspaceId,
            folderName: folderName
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}

export const deleteFolder = async (workspaceId, folderId) => {
    try {
        const response = await api.post("/folder/delete", {
            workspaceId,
            folderId
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}