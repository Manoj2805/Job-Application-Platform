import React from 'react';

const JobDetails = ({ job }) => {
    if (!job) {
        return <p>Select a job to see the details.</p>;
    }

    return (
        <div className="card">
            <h2>{job.title}</h2>
            <h4>{job.companyName} - {job.location}</h4>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Salary:</strong> {job.salary ? `$${job.salary.toLocaleString()}` : 'Not Disclosed'}</p>
            <hr/>
            <p><strong>Description:</strong></p>
            <p>{job.description}</p>
        </div>
    );
};

export default JobDetails;