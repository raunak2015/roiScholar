import axios from 'axios';
import { toast } from 'react-toastify';
import { clearAuthStorage, getStorageItem } from './storage';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor: attach JWT token to every request
apiClient.interceptors.request.use((config) => {
	const token = getStorageItem('token', null, 'localStorage');

	if (token) {
		config.headers = config.headers || {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

// Response interceptor: global error handling
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		const message = error?.response?.data?.message || error.message;

		if (status === 401) {
			toast.error('Session expired. Please log in again.');
			clearAuthStorage();
			if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
				window.location.assign('/login');
			}
		} else if (status === 403) {
			toast.error('You do not have permission to perform this action.');
		} else if (status >= 500) {
			toast.error('Server error. Please try again later.');
		} else if (!error.response) {
			toast.error('Network error. Please check your connection.');
		} else if (status !== 404 && status !== 400) {
			// 400/404 are handled individually; catch everything else
			toast.error(`Error: ${message}`);
		}

		return Promise.reject(error);
	},
);

export const setAuthToken = (token) => {
	if (token) {
		apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		return;
	}

	delete apiClient.defaults.headers.common.Authorization;
};

export default apiClient;
