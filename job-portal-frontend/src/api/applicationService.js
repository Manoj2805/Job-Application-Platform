import apiClient from './api';

export const applyForJob = (applicationData) => {
    
    if (!applicationData.userId || !applicationData.jobId) {
        return Promise.reject(new Error("Missing required fields"));
    }
    
    
    const formattedData = {
        ...applicationData,
        status: applicationData.status || "APPLIED",
        appliedDate: applicationData.appliedDate || new Date().toISOString().split('T')[0]
    };
    
    
    console.log('Sending application data:', JSON.stringify(formattedData));
    console.log('API base URL:', apiClient.defaults.baseURL);
    

    return apiClient.post('/applications', formattedData)
        .then(response => {
            console.log('Application submitted successfully via /applications:', response.data);
            return response;
        })
        .catch(error => {
            console.error('Error submitting application via /applications:', error.response || error);
            
        
            console.log('Attempting alternative endpoint /jobs/:jobId/applications');
            return apiClient.post(`/jobs/${applicationData.jobId}/applications`, formattedData)
                .then(response => {
                    console.log('Application submitted successfully via alternative endpoint:', response.data);
                    return response;
                })
                .catch(alternativeError => {
                    console.error('Alternative endpoint also failed:', alternativeError.response || alternativeError);
                    throw alternativeError;
                });
        });
};

export const getAllApplications = () => {
    return apiClient.get('/applications');
};

export const getApplicationById = (id) => {
    return apiClient.get(`/applications/${id}`);
};

export const getApplicationsByUserId = (userId) => {
    return apiClient.get(`/applications/user/${userId}`);
};

export const getApplicationsByJobId = (jobId) => {
    
    console.log(`Fetching all applications to filter by job ${jobId}`);
    
    return apiClient.get(`/jobs/${jobId}/applications`)
        .then(response => {
            if (Array.isArray(response.data) && response.data.length > 0) {
                console.log(`Successfully fetched ${response.data.length} applications for job ${jobId} via direct endpoint`);
                console.log('Raw application data:', JSON.stringify(response.data));
                return response;
            }
            
            
            console.log('Direct endpoint returned empty array, trying fallback to all applications');
            return apiClient.get('/applications')
                .then(fallbackResponse => {
                    if (Array.isArray(fallbackResponse.data)) {
                
                        const filteredApps = fallbackResponse.data.filter(app => 
                            app.jobId === parseInt(jobId) || app.jobId === jobId.toString()
                        );
                        console.log(`Filtered ${filteredApps.length} applications for job ${jobId} from ${fallbackResponse.data.length} total`);
                        
                        
                        return {
                            ...fallbackResponse,
                            data: filteredApps
                        };
                    }
                
                    return response;
                })
                .catch(fallbackError => {
                    console.error('Fallback to all applications failed:', fallbackError);
                    
                    return response;
                });
        })
        .catch(error => {
            console.error(`Error fetching applications for job ${jobId}:`, error.response || error);
            
            
            console.log('Trying direct applications endpoint with filter');
            return apiClient.get('/applications')
                .then(response => {
                    if (!Array.isArray(response.data)) {
                        console.warn('Unexpected data format from /applications endpoint', response.data);
                        return { data: [] };
                    }
                    
                    
                    const filteredApps = response.data.filter(app => 
                        app.jobId === parseInt(jobId) || app.jobId === jobId.toString()
                    );
                    console.log(`Filtered ${filteredApps.length} applications for job ${jobId} from ${response.data.length} total`);
                    
                    return { 
                        ...response, 
                        data: filteredApps 
                    };
                })
                .catch(allError => {
                    console.error('All endpoints failed:', allError);
                    throw allError;
                });
        });
};

export const updateApplicationStatus = (id, status) => {
    
    console.log(`Updating application ${id} status to ${status}`);
    
    const url = `/applications/${id}/status?status=${encodeURIComponent(status)}`;
    console.log(`Using correctly formatted URL with query parameter: ${url}`);
    

    return apiClient.put(url)
        .then(response => {
            console.log(`Successfully updated application ${id} status to ${status}`);
            console.log('Response data:', response.data);
            return response;
        })
        .catch(error => {
            console.error(`Error updating application ${id} status:`, error.response || error);
            
            
            console.log('Trying alternative query parameter format');
            return apiClient.put(`/applications/${id}/status`, null, {
                params: { status }
            })
                .then(response => {
                    console.log('Alternative query parameter format worked');
                    return response;
                })
                .catch(alternativeError => {
                    console.error('Alternative format also failed:', alternativeError);
                    throw alternativeError;
                });
        });
};

export const deleteApplication = (id) => {
    return apiClient.delete(`/applications/${id}`);
};