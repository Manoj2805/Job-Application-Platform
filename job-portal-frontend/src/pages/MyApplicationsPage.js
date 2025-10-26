import React, { useState, useEffect } from 'react';
import { getApplicationsByUserId, deleteApplication } from '../api/applicationService';
import { getJobById } from '../api/jobService';
import ApplicationList from '../components/applications/ApplicationList';

// NOTE: We are hardcoding the userId to '1' for demonstration.
const USER_ID = 1;

const MyApplicationsPage = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await getApplicationsByUserId(USER_ID);
                if (response && response.data) {
                   
                    const appData = response.data;
                    
                    const applicationsWithJobDetails = await Promise.all(
                        appData.map(async (application) => {
                            try {
                                const jobResponse = await getJobById(application.jobId);
                                const jobData = jobResponse.data;
                                
                                return {
                                    ...application,
                                    jobTitle: jobData.title || application.jobTitle || 'Unknown Position',
                                    companyName: jobData.companyName || 'Unknown Company',
                                    location: jobData.location || 'Unknown Location'
                                };
                            } catch (jobError) {
                                console.error(`Error fetching job details for application ${application.id}:`, jobError);
                               
                                return {
                                    ...application,
                                    jobTitle: application.jobTitle || 'Unknown Position',
                                    companyName: 'Information Unavailable',
                                    location: 'Unknown Location'
                                };
                            }
                        })
                    );
                    
                    setApplications(applicationsWithJobDetails);
                } else {
                    setApplications([]);
                }
            } catch (err) {
                console.error('Error fetching applications:', err);
                setError('Failed to load applications. Please try again later.');
                
               
                setApplications([
                    {
                        id: 201,
                        jobId: 1,
                        userId: USER_ID,
                        jobTitle: 'Frontend Developer',
                        companyName: 'Tech Corp',
                        status: 'pending',
                        appliedAt: new Date().toISOString()
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchApplications();
    }, []);

    const handleWithdraw = async (applicationId) => {
        
        const application = applications.find(app => app.id === applicationId);
        const jobInfo = application ? `${application.jobTitle} at ${application.companyName}` : 'this job';
        
        if (window.confirm(`Are you sure you want to withdraw your application for ${jobInfo}?`)) {
            try {
                await deleteApplication(applicationId);
                setApplications(prev => prev.filter(app => app.id !== applicationId));
               
                alert(`Your application for ${jobInfo} has been successfully withdrawn.`);
            } catch (err) {
                console.error('Error withdrawing application:', err);
                alert('Failed to withdraw the application. Please try again later.');
            }
        }
    };

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>My Job Applications (User ID: {USER_ID})</h1>
            <ApplicationList applications={applications} onWithdraw={handleWithdraw} />
        </div>
    );
};

export default MyApplicationsPage;





