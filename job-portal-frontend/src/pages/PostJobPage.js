import React, { useState, useEffect } from 'react';
import JobForm from '../components/jobs/JobForm';
import { createJob } from '../api/jobService';
import { useNavigate } from 'react-router-dom';

const PostJobPage = () => {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
 
    useEffect(() => {
        if (!document.getElementById('error-animations')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'error-animations';
            styleElement.textContent = `
                @keyframes shakeError {
                    0% { transform: translateX(0); }
                    15% { transform: translateX(-5px); }
                    30% { transform: translateX(5px); }
                    45% { transform: translateX(-3px); }
                    60% { transform: translateX(3px); }
                    75% { transform: translateX(-2px); }
                    90% { transform: translateX(2px); }
                    100% { transform: translateX(0); }
                }
            `;
            document.head.appendChild(styleElement);
            
            return () => {
                document.head.removeChild(styleElement);
            };
        }
    }, []);

    const validateJobData = (jobData) => {
        const errors = {};
        
        if (!jobData.title.trim()) {
            errors.title = 'Job title is required';
        } else if (jobData.title.length < 5) {
            errors.title = 'Job title must be at least 5 characters';
        }

        if (!jobData.companyName.trim()) {
            errors.companyName = 'Company name is required';
        }

        if (!jobData.description.trim()) {
            errors.description = 'Job description is required';
        } else if (jobData.description.length < 20) {
            errors.description = 'Please provide a more detailed job description (min 20 characters)';
        }

        if (jobData.salary && (isNaN(jobData.salary) || jobData.salary < 0)) {
            errors.salary = 'Salary must be a positive number';
        }

        if (!jobData.location.trim()) {
            errors.location = 'Location is required';
        }

        return errors;
    };

    const handleCreateJob = async (jobData) => {
        const errors = validateJobData(jobData);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            try {
                // NOTE: Hardcoded userId since there is no authentication.
                const fullJobData = { ...jobData, userId: 2 };                
                await createJob(fullJobData);
                setSuccessMessage(`Job "${jobData.title}" created successfully!`);
                
                setTimeout(() => {
                    navigate('/jobs');
                }, 1500);
            } catch (error) {
                console.error('Error creating job:', error);
                alert('Failed to create job: ' + (error.response?.data?.message || error.message || 'Unknown error'));
            } finally {
                setSubmitting(false);
            }
        } else {
           
            window.scrollTo(0, 0);
        }
    };

    return (
        <div>
            <h1>Post a New Job</h1>
            
            {successMessage && (
                <div style={{ 
                    padding: '15px 20px', 
                    backgroundColor: '#e6ffe6', 
                    borderLeft: '4px solid #4CAF50',
                    marginBottom: '20px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0, 128, 0, 0.1)'
                }} role="status">
                    <p style={{ 
                        margin: 0, 
                        color: '#2e7d32', 
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <span style={{ marginRight: '8px' }}>✓</span>
                        {successMessage}
                    </p>
                </div>
            )}
            
            {Object.keys(validationErrors).length > 0 && (                <div style={{ 
                    padding: '15px 20px', 
                    backgroundColor: '#ffeeee', 
                    borderLeft: '4px solid #ff6666',
                    marginBottom: '20px',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(255, 0, 0, 0.1)',
                    animation: 'shakeError 0.5s ease-in-out'
                }} role="alert" aria-live="assertive">
                    <h3 style={{ margin: '0 0 10px 0', color: '#cc0000', display: 'flex', alignItems: 'center' }}>
                        <span style={{ marginRight: '8px' }}>⚠️</span> 
                        Please correct the following errors:
                    </h3>
                    <div style={{ margin: 0, paddingLeft: '20px' }}>
                        {Object.entries(validationErrors).map(([field, error], index) => (
                            <span 
                                key={index} 
                                style={{ 
                                    color: '#cc0000', 
                                    display: 'block', 
                                    marginBottom: '8px',
                                    fontWeight: '500' 
                                }}
                            >
                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {error}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <JobForm onSubmit={handleCreateJob} errors={validationErrors} isSubmitting={submitting} />
        </div>
    );
};

export default PostJobPage;