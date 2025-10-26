import React, { useState, useEffect } from 'react';
import { getAllJobs } from '../api/jobService';
import { applyForJob } from '../api/applicationService';
import JobList from '../components/jobs/JobList';

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getAllJobs();
                setJobs(response.data);
            } catch (err) {
                setError('Failed to fetch jobs. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);    const handleApply = async (jobId) => {
        // NOTE: Hardcoded userId since there is no authentication.
        const applicationData = { 
            userId: 1, 
            jobId: jobId, 
            status: "APPLIED",
            appliedDate: new Date().toISOString().split('T')[0] // Format date as YYYY-MM-DD
        };
        
        try {
            const response = await applyForJob(applicationData);
            console.log('Application submitted successfully:', response.data);
            alert(`Successfully applied for job ID: ${jobId}`);
        } catch (err) {
            console.error('Error applying for job:', err);
            
            if (err.response && err.response.status === 400) {
                alert(`Application failed: ${err.response.data.message || 'Invalid application data'}`);
            } else {
                alert('Failed to apply. You may have already applied for this job.');
            }
        }
    };

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>Available Jobs</h1>
            <JobList jobs={jobs} onApply={handleApply} />
        </div>
    );
};

export default JobsPage;