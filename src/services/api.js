// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';

export const fetchSeeds = async () => {
    try {
        const response = await axios.get(`${API_URL}seeds/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching seeds data:", error);
        throw error;
    }
};

export const fetchMonitoring = async () => {
    try {
        const response = await axios.get(`${API_URL}monitoring/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching monitoring data:", error);
        throw error;
    }
};
