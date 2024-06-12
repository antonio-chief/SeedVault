import axios from 'axios';

const API_URL = 'http://localhost:8000/api/seeds/';

export const fetchSeeds = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching seeds data:", error);
        throw error;
    }
};
