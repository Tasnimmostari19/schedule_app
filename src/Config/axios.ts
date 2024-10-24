import axios from "axios";

const apiClient = axios.create({
    baseURL: 'https://appointment-assignment.netlify.app/.netlify/functions',
});

// Add a request interceptor to attach the token
apiClient.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage (or any other storage method you're using)
        //   const token = localStorage.getItem('authToken'); // Replace 'authToken' with your key if different
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3ZmU3YTUwNDE4ZjI4MTlhYjkyMmMiLCJpYXQiOjE3Mjk3NjE5MjQsImV4cCI6MTcyOTc2NTUyNH0.hNvpixGToCfrnPZK4rOVZGf6Stnw6D82Jfalt_9I0Yk'
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Add the token to Authorization header
        }

        return config;
    },
    (error) => {
        // Handle error in request
        return Promise.reject(error);
    }
);

export default apiClient;