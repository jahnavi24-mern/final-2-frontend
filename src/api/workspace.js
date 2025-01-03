import api from './api';

export const workspaceApi = {
    getWorkspaceDetails: async (workspaceId) => {
        try {
            const response = await api.get(`/workspace/${workspaceId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    shareWorkspace: async (workspaceId, userId, accessLevel) => {
        try {
            const response = await api.post("/workspace/share", {
                workspaceId,
                userId,
                accessLevel
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};