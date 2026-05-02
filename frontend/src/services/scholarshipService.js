import apiClient from './api';

const API_URL = '/scholarships';

export const fetchScholarships = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.degree) params.append('degree', filters.degree);
    if (filters.country) params.append('country', filters.country);
    if (filters.stemOnly) params.append('stemOnly', filters.stemOnly);

    const response = await apiClient.get(`${API_URL}?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    throw error;
  }
};
