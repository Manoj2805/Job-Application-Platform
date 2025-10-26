import React, { useState, useEffect } from 'react';
import { getApplicationsByJobId, updateApplicationStatus, applyForJob } from '../api/applicationService';
import { getJobById } from '../api/jobService';

const JOB_ID_TO_MANAGE = 1;

const ManageApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [jobDetails, setJobDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creatingDemoApp, setCreatingDemoApp] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');

    useEffect(() => {
        const fetchJobAndApplications = async () => {
            console.log('Starting to fetch data for job ID:', JOB_ID_TO_MANAGE);
            try {
                
                try {
                    const jobResponse = await getJobById(JOB_ID_TO_MANAGE);
                    console.log('Job details response:', jobResponse);
                    if (jobResponse && jobResponse.data) {
                        setJobDetails(jobResponse.data);
                        console.log('Job details set:', jobResponse.data);
                    } else {
                        console.warn('No job details found for ID:', JOB_ID_TO_MANAGE);
                    }
                } catch (jobErr) {
                    console.error('Error fetching job details:', jobErr);
                }
                
                console.log('Fetching applications for job ID:', JOB_ID_TO_MANAGE);
                const response = await getApplicationsByJobId(JOB_ID_TO_MANAGE);
                console.log('Applications response status:', response?.status);
                console.log('Applications response type:', response?.data ? typeof response.data : 'undefined');
                
                if (response && response.data) {
                    if (Array.isArray(response.data)) {
                        console.log(`Setting ${response.data.length} applications`);
                        setApplications(response.data);
                    } else if (typeof response.data === 'object' && response.data.content && Array.isArray(response.data.content)) {
                        
                        console.log(`Setting ${response.data.content.length} applications from paginated data`);
                        setApplications(response.data.content);
                    } else {
                        console.warn('Unexpected data format:', response.data);
                        setApplications([]);
                    }                } else {
                    console.warn('No applications data found');
                    setApplications([]);
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError(`Failed to load applications: ${err.message || 'Unknown error'}`);
                
                
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchJobAndApplications();
    }, []);    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            console.log(`Attempting to update application ${appId} status to ${newStatus}`);
            const response = await updateApplicationStatus(appId, newStatus);
            
            if (response && response.data) {
                console.log(`Server confirmed status update for application ${appId}:`, response.data);
                setApplications(prev => prev.map(app => 
                    app.id === appId ? { ...app, status: newStatus } : app
                ));
                alert(`Application status updated to ${newStatus}`);
            } else {
                console.log(`Status update for application ${appId} may have succeeded but no data returned`);
    
                setApplications(prev => prev.map(app => 
                    app.id === appId ? { ...app, status: newStatus } : app
                ));
                alert(`Application status likely updated to ${newStatus}`);
            }
        } catch (err) {
            console.error('Error updating application status:', err);
            
            const shouldUpdateUI = window.confirm(
                `Server error occurred while updating status. Would you like to update the status locally anyway?\n\n` +
                `This will make the change appear in the interface, but it may not be saved on the server.`
            );
            
            if (shouldUpdateUI) {
                setApplications(prev => prev.map(app => 
                    app.id === appId ? { ...app, status: newStatus } : app
                ));
                console.log(`Optimistically updated application ${appId} status in UI only`);
            } else {
                alert('Status update canceled.');
            }
        }
    };const createDemoApplication = async () => {
        if (!jobDetails) {
            alert('Cannot create demo application without job details');
            return;
        }

        setCreatingDemoApp(true);
        try {
            const demoApplication = {
                userId: 1, 
                jobId: JOB_ID_TO_MANAGE,
                status: "APPLIED",
                appliedDate: new Date().toISOString().split('T')[0]
            };

            console.log('Creating demo application with data:', JSON.stringify(demoApplication));
            const response = await applyForJob(demoApplication);
            
            console.log('Demo application creation response:', response);
            if (response && response.data) {
                console.log('Demo application created, response data:', response.data);
                
                
                const newApplication = response.data;
                
                
                console.log('Refreshing applications list...');
                const updatedResponse = await getApplicationsByJobId(JOB_ID_TO_MANAGE);
                console.log('Updated applications response:', updatedResponse);
                
                if (updatedResponse && updatedResponse.data && Array.isArray(updatedResponse.data) && updatedResponse.data.length > 0) {
                    console.log(`Setting ${updatedResponse.data.length} applications from server response`);
                    setApplications(updatedResponse.data);
                } else {
                    console.warn('No updated applications found in server response, adding locally created application to state');
                    
                    
                    setApplications(prev => {
                        if (newApplication.id && prev.some(app => app.id === newApplication.id)) {
                            return prev.map(app => app.id === newApplication.id ? newApplication : app);
                        } 
                        
                        return [...prev, newApplication];
                    });
                }
                
                alert('Demo application created successfully! Application ID: ' + 
                    (response.data.id || 'Unknown'));
            } else {
                console.warn('No response data from application creation');
                alert('Application may have been created, but no confirmation received');
            }
        } catch (err) {
            console.error('Error creating demo application:', err);
            alert('Failed to create demo application: ' + (err.message || 'Unknown error'));
        } finally {
            setCreatingDemoApp(false);
        }
    };

    const refreshApplications = async () => {
        setLoading(true);
        try {
            console.log(`Manually refreshing applications for job ${JOB_ID_TO_MANAGE}`);
            const response = await getApplicationsByJobId(JOB_ID_TO_MANAGE);
            console.log('Manual refresh response:', response);
            
            if (response && response.data) {
                console.log(`Retrieved ${Array.isArray(response.data) ? response.data.length : 'unknown'} applications`);
                setApplications(response.data);
                alert(`Retrieved ${Array.isArray(response.data) ? response.data.length : 0} applications`);
            } else {
                console.warn('No data in manual refresh response');
                setApplications([]);
                alert('No applications found');
            }
        } catch (err) {
            console.error('Error in manual refresh:', err);
            setError('Failed to refresh applications: ' + (err.message || 'Unknown error'));
            alert('Error refreshing applications');
        } finally {
            setLoading(false);
        }
    };    const showDebugInfo = () => {
        setDebugInfo("Loading debug information...");
        

        const endpoints = [
            { url: `/jobs/${JOB_ID_TO_MANAGE}/applications`, name: "Job-specific endpoint" },
            { url: `/applications`, name: "All applications" },
            { url: `/applications?jobId=${JOB_ID_TO_MANAGE}`, name: "Applications with query filter" }
        ];
        
        
        Promise.all(
            endpoints.map(endpoint => 
                fetch(`http://localhost:8089${endpoint.url}`)
                    .then(response => {
                        if (!response.ok) {
                            return { 
                                endpoint: endpoint.name, 
                                status: response.status,
                                error: `Failed with status ${response.status}` 
                            };
                        }
                        return response.json().then(data => ({
                            endpoint: endpoint.name,
                            status: response.status,
                            data: data
                        }));
                    })
                    .catch(error => ({
                        endpoint: endpoint.name,
                        error: error.message
                    }))
            )
        ).then(results => {
           
            let debugText = "# API Endpoint Tests\n\n";
            
            results.forEach(result => {
                debugText += `## ${result.endpoint}\n`;
                debugText += `Status: ${result.status || 'Error'}\n\n`;
                
                if (result.error) {
                    debugText += `Error: ${result.error}\n\n`;
                } else if (result.data) {
                    
                    if (result.endpoint === "All applications" && Array.isArray(result.data)) {
                        debugText += `Total applications: ${result.data.length}\n`;
                        debugText += `Applications for job ${JOB_ID_TO_MANAGE}: ${result.data.filter(app => 
                            app.jobId === JOB_ID_TO_MANAGE || app.jobId === JOB_ID_TO_MANAGE.toString()
                        ).length}\n\n`;
                        
                        
                        const jobCounts = {};
                        result.data.forEach(app => {
                            const jobId = app.jobId;
                            jobCounts[jobId] = (jobCounts[jobId] || 0) + 1;
                        });
                        
                        debugText += "Job ID counts:\n";
                        Object.keys(jobCounts).forEach(jobId => {
                            debugText += `- Job ID ${jobId}: ${jobCounts[jobId]} application(s)\n`;
                        });
                        debugText += "\n";
                    }
                    
                    
                    if (Array.isArray(result.data)) {
                        debugText += `Data: ${JSON.stringify(result.data, null, 2)}\n\n`;
                    } else {
                        debugText += `Non-array data: ${JSON.stringify(result.data, null, 2)}\n\n`;
                    }
                    
                   
                    if (Array.isArray(result.data)) {
                        const jobApps = result.data.filter(app => 
                            app.jobId === JOB_ID_TO_MANAGE || app.jobId === JOB_ID_TO_MANAGE.toString()
                        );
                        
                        if (jobApps.length > 0) {
                            console.log(`Found ${jobApps.length} applications for job ${JOB_ID_TO_MANAGE} in endpoint ${result.endpoint}`);
                            setApplications(jobApps);
                        }
                    }
                }
            });
            debugText += "## Current API Data Summary\n";
            
            const allApplicationsResult = results.find(r => r.endpoint === "All applications");
            if (allApplicationsResult && Array.isArray(allApplicationsResult.data)) {
                const jobApps = allApplicationsResult.data.filter(app => 
                    app.jobId === JOB_ID_TO_MANAGE || app.jobId === JOB_ID_TO_MANAGE.toString()
                );
                
                debugText += `Total applications in database: ${allApplicationsResult.data.length}\n`;
                debugText += `Applications for job ${JOB_ID_TO_MANAGE}: ${jobApps.length}\n\n`;
                
                if (jobApps.length > 0) {
                    debugText += "Applications for this job:\n";
                    jobApps.forEach(app => {
                        debugText += `- ID: ${app.id}, User: ${app.userId}, Status: ${app.status}, Applied: ${app.appliedDate || app.appliedAt || 'Unknown'}\n`;
                    });
                } else {
                    debugText += "No applications found for this job in the database.\n";
                }
            } else {
                debugText += "Could not retrieve application data from API.\n";
            }
            
            console.log('API debug results:', results);
            setDebugInfo(debugText);
            
            
            const successfulEndpoints = results.filter(r => r.status === 200).length;
            alert(`Tested ${results.length} endpoints, ${successfulEndpoints} successful. See debug panel for details.`);
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return 'Invalid Date';
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Applications for {jobDetails ? jobDetails.title : `Job #${JOB_ID_TO_MANAGE}`}</h2>
            {jobDetails && (
                <div className="job-info" style={{ marginBottom: '20px' }}>
                    <p><strong>Company:</strong> {jobDetails.companyName}</p>
                    {jobDetails.location && <p><strong>Location:</strong> {jobDetails.location}</p>}
                </div>
            )}
            
            <div style={{ marginBottom: '20px' }}>
                <button 
                    onClick={refreshApplications} 
                    style={{ 
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        marginRight: '10px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Refresh Applications
                </button>
                
                <button 
                    onClick={showDebugInfo} 
                    style={{ 
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Show Debug Info
                </button>
            </div>
            
            {debugInfo && (
                <div style={{ 
                    marginBottom: '20px', 
                    padding: '10px', 
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    maxHeight: '200px',
                    overflow: 'auto'
                }}>
                    <h4>Debug Information:</h4>
                    <pre>{debugInfo}</pre>
                </div>
            )}
              {applications.length === 0 ? (
                <div style={{ 
                    padding: '20px', 
                    textAlign: 'center',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f8f9fa'
                }}>
                    <p style={{ fontSize: '18px', marginBottom: '20px' }}>No applications found in database for this job.</p>
                    <p style={{ color: '#666', marginBottom: '20px' }}>You can create a real application or refresh to check for updated data.</p>
                    <button 
                        onClick={createDemoApplication} 
                        disabled={creatingDemoApp}
                        style={{ 
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '4px',
                            marginRight: '10px',
                            cursor: creatingDemoApp ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {creatingDemoApp ? 'Creating...' : 'Create New Application'}
                    </button>
                    <button 
                        onClick={refreshApplications} 
                        style={{ 
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            padding: '10px 15px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Refresh Data
                    </button>
                </div>
            ) : (
                <div>
                    {applications.map(app => (
                        <div key={app.id} className="card" style={{ 
                            marginBottom: '15px',
                            padding: '15px',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}>                            <h4>Applicant: {app.userName || app.applicantName || `User #${app.userId}`}</h4>
                            <p>
                                <strong>Status: </strong>
                                <span style={{ 
                                    display: 'inline-block',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: 
                                        app.status === 'ACCEPTED' ? '#28a745' :
                                        app.status === 'REJECTED' ? '#dc3545' :
                                        app.status === 'INTERVIEWING' ? '#ffc107' :
                                        app.status === 'VIEWED' ? '#17a2b8' :
                                        app.status === 'APPLIED' ? '#007bff' : 
                                        '#6c757d'
                                }}>
                                    {app.status || 'PENDING'}
                                </span>
                            </p>
                            <p><strong>Applied on:</strong> {formatDate(app.appliedAt || app.appliedDate)}</p>
                            <div>
                                <button 
                                    onClick={() => handleStatusUpdate(app.id, 'VIEWED')}
                                    style={{
                                        marginRight: '5px',
                                        backgroundColor: '#17a2b8',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Viewed
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate(app.id, 'INTERVIEWING')}
                                    style={{
                                        marginRight: '5px',
                                        backgroundColor: '#ffc107',
                                        color: 'black',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Interviewing
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}
                                    style={{
                                        marginRight: '5px',
                                        backgroundColor: '#28a745',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Accept
                                </button>
                                <button 
                                    onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: 'none',
                                        padding: '5px 10px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageApplicationsPage;