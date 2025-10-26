import React from 'react';


const ApplicationForm = ({ user, job, onSubmit, onCancel }) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const applicationData = {
            userId: user.id,
            jobId: job.id,
            status: "APPLIED"
        };
        onSubmit(applicationData);
    };

    return (
        <div className="card">
            <h3>Confirm Your Application</h3>
            <p>You are applying for the position of:</p>
            <h4>{job.title} at {job.companyName}</h4>
            <p>Your application will be submitted using the name: <strong>{user.name}</strong></p>
            <form onSubmit={handleSubmit}>
                <button type="submit" style={{ backgroundColor: '#28a745' }}>Confirm & Apply</button>
                <button type="button" onClick={onCancel} style={{ backgroundColor: '#6c757d' }}>Cancel</button>
            </form>
        </div>
    );
};

export default ApplicationForm;