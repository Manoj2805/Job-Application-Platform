import apiClient from './api';

export const getAllUsers = () => {
    return apiClient.get('/api/users');
};

export const getUserById = (id) => {
    return apiClient.get(`/api/users/${id}`);
};

export const createUser = (userData) => {
    return apiClient.post('/api/users', userData);
};

export const updateUser = (id, userData) => {
    return apiClient.put(`/api/users/${id}`, userData);
};

export const deleteUser = (id) => {
    return apiClient.delete(`/api/users/${id}`);
};