import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/';


// Function to fetch seed data
export const fetchseeds = async () => {
    try {
        const response = await axios.get(`${API_URL}mydjangoapp_seeds/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching seed data:", error);
        throw error;
    }
};

// Function to post seed data
export const postseeds = async (seedData) => {
    try {
        const response = await axios.post(`${API_URL}mydjangoapp_seeds/`, seedData);
        return response.data;
    } catch (error) {
        console.error("Error posting seed data:", error);
        throw error;
    }
};

// Function to fetch monitoring data
export const fetchMonitoring = async () => {
    try {
        const response = await axios.get(`${API_URL}monitoring/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching monitoring data:", error);
        throw error;
    }
};

// Function to post monitoring data
export const postMonitoring = async (monitoringData) => {
    try {
        const response = await axios.post(`${API_URL}monitoring/`, monitoringData);
        return response.data;
    } catch (error) {
        console.error("Error posting monitoring data:", error);
        throw error;
    }
};


// Function to fetch admin feedback data
export const fetchAdminFeedback = async () => {
    try {
        const response = await axios.get(`${API_URL}admin-feedback/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin-feedback data:", error);
        throw error;
    }
};

// Function to post admin feedback data
export const postAdminFeedback = async (feedbackData) => {
    try {
        const response = await axios.post(`${API_URL}admin-feedback/`, feedbackData);
        return response.data;
    } catch (error) {
        console.error("Error posting admin feedback data:", error);
        throw error;
    }
};

// Function to fetch admin seed catalog data
export const fetchAdminSeedCatalog = async () => {
    try {
        const response = await axios.get(`${API_URL}admin-seed-catalog/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin seed catalog data:", error);
        throw error;
    }
};

// Function to post admin seed catalog data
export const postAdminSeedCatalog = async (seedCatalogData) => {
    try {
        const response = await axios.post(`${API_URL}admin-seed-catalog/`, seedCatalogData);
        return response.data;
    } catch (error) {
        console.error("Error posting admin seed catalog data:", error);
        throw error;
    }
};

// Function to fetch admin subscription data
export const fetchAdminSubscription = async () => {
    try {
        const response = await axios.get(`${API_URL}admin-subscription/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching admin subscription data:", error);
        throw error;
    }
};

// Function to post admin subscription data
export const postAdminSubscription = async (subscriptionData) => {
    try {
        const response = await axios.post(`${API_URL}admin-subscription/`, subscriptionData);
        return response.data;
    } catch (error) {
        console.error("Error posting admin subscription data:", error);
        throw error;
    }
};

// Function to fetch dampness analytics data
export const fetchDampnessAnalytics = async () => {
    try {
        const response = await axios.get(`${API_URL}dampness-analytics/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dampness analytics data:", error);
        throw error;
    }
};

// Function to post dampness analytics data
export const postDampnessAnalytics = async (analyticsData) => {
    try {
        const response = await axios.post(`${API_URL}dampness-analytics/`, analyticsData);
        return response.data;
    } catch (error) {
        console.error("Error posting dampness analytics data:", error);
        throw error;
    }
};

// Function to fetch events data
export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}events/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching events data:", error);
        throw error;
    }
};

// Function to post events data
export const postEvents = async (eventsData) => {
    try {
        const response = await axios.post(`${API_URL}events/`, eventsData);
        return response.data;
    } catch (error) {
        console.error("Error posting events data:", error);
        throw error;
    }
};

// Function to fetch light exposure analytics data
export const fetchLightExposureAnalytics = async () => {
    try {
        const response = await axios.get(`${API_URL}light-exposure-analytics/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching light exposure analytics data:", error);
        throw error;
    }
};

// Function to post light exposure analytics data
export const postLightExposureAnalytics = async (lightAnalyticsData) => {
    try {
        const response = await axios.post(`${API_URL}light-exposure-analytics/`, lightAnalyticsData);
        return response.data;
    } catch (error) {
        console.error("Error posting light exposure analytics data:", error);
        throw error;
    }
};

// Function to fetch security data
export const fetchSecurity = async () => {
    try {
        const response = await axios.get(`${API_URL}security/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching security data:", error);
        throw error;
    }
};

// Function to post security data
export const postSecurity = async (securityData) => {
    try {
        const response = await axios.post(`${API_URL}security/`, securityData);
        return response.data;
    } catch (error) {
        console.error("Error posting security data:", error);
        throw error;
    }
};

// Function to fetch storage data
export const fetchStorage = async () => {
    try {
        const response = await axios.get(`${API_URL}storage/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching storage data:", error);
        throw error;
    }
};

// Function to post storage data
export const postStorage = async (storageData) => {
    try {
        const response = await axios.post(`${API_URL}storage/`, storageData);
        return response.data;
    } catch (error) {
        console.error("Error posting storage data:", error);
        throw error;
    }
};

// Function to fetch temperature analytics data
export const fetchTemperatureAnalytics = async () => {
    try {
        const response = await axios.get(`${API_URL}temperature-analytics/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching temperature analytics data:", error);
        throw error;
    }
};

// Function to post temperature analytics data
export const postTemperatureAnalytics = async (temperatureAnalyticsData) => {
    try {
        const response = await axios.post(`${API_URL}temperature-analytics/`, temperatureAnalyticsData);
        return response.data;
    } catch (error) {
        console.error("Error posting temperature analytics data:", error);
        throw error;
    }
};

// Function to fetch user data
export const fetchUser = async () => {
    try {
        const response = await axios.get(`${API_URL}user/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Function to post user data
export const postUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}user/`, userData);
        return response.data;
    } catch (error) {
        console.error("Error posting user data:", error);
        throw error;
    }
};

// Function to fetch weather data
export const fetchWeather = async () => {
    try {
        const response = await axios.get(`${API_URL}weather/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

// Function to post weather data
export const postWeather = async (weatherData) => {
    try {
        const response = await axios.post(`${API_URL}weather/`, weatherData);
        return response.data;
    } catch (error) {
        console.error("Error posting weather data:", error);
        throw error;
    }
};

// Add similar functions for other API endpoints as needed
