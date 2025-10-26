import React from 'react';

const JobList = ({ jobs, onApply }) => {
    return (
        <div>
            {jobs.length === 0 ? (
                <p>No jobs found.</p>
            ) : (
                jobs.map((job) => (
                    <div key={job.id} className="card">
                        <h3>{job.title}</h3>
                        <p><strong>Company:</strong> {job.companyName}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>{job.description}</p>
                        <button onClick={() => onApply(job.id)}>Apply Now</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default JobList;