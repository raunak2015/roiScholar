import apiClient from './api';

export const submitApplication = async (formData) => {
  // Use FormData for multipart/form-data support
  const data = new FormData();
  
  // Append basic fields
  Object.keys(formData).forEach(key => {
    if (key !== 'documents') {
      data.append(key, formData[key]);
    }
  });

  // Append documents
  if (formData.documents && formData.documents.length > 0) {
    formData.documents.forEach(file => {
      data.append('documents', file);
    });
  }

  const response = await apiClient.post('/applications', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const getMyApplications = async () => {
  const response = await apiClient.get('/applications');
  return response.data;
};
