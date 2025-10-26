import apiClient from './api';

export const getAllJobs = () => {
    return apiClient.get('/jobs');
};

export const getJobById = (id) => {
    return apiClient.get(`/jobs/${id}`);
};

export const createJob = (jobData) => {
    return apiClient.post('/jobs', jobData);
};

export const updateJob = (id, jobData) => {
    return apiClient.put(`/jobs/${id}`, jobData);
};

export const deleteJob = (id) => {
    return apiClient.delete(`/jobs/${id}`);
};

export const getJobsByUserId = (userId) => {
    return apiClient.get(`/jobs/user/${userId}`);
};