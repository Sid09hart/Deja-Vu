import axios from 'axios';

// Create a configured instance
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/memes",
});

export const fetchMemes = async (query = '') => {
    // If query exists, search. Otherwise, maybe fetch recent (if we implemented that)
    // For now, we will handle empty query gracefully
    const url = query ? `/search?q=${query}` : '/search?q=funny'; 
    const response = await api.get(url);
    return response.data;
};

export const uploadMeme = async (file, description) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);
    
    const response = await api.post('/upload', formData);
    return response.data;
};

export default api;