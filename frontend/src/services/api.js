import axios from 'axios';
import { clearAuthStorage, getStorageItem } from './storage';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

apiClient.interceptors.request.use((config) => {
	const token = getStorageItem('token', null, 'localStorage');

	if (token) {
		config.headers = config.headers || {};
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;

		if (status === 401) {
			clearAuthStorage();

			if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
				window.location.assign('/login');
			}
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
