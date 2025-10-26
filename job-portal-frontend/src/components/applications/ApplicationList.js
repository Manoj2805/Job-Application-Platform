import React from 'react';

const ApplicationList = ({ applications, onWithdraw }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return 'Invalid Date';
        }
    };    const getStatusStyle = (status) => {
        const statusUpper = (status || 'APPLIED').toUpperCase();
        
      
        const baseStyle = {
            display: 'inline-block',
            padding: '4px 8px',
            borderRadius: '4px',
            fontWeight: 'bold',
            color: 'white'
        };
        
        switch (statusUpper) {
            case 'ACCEPTED':
                return { ...baseStyle, backgroundColor: '#28a745' }; // Green
            case 'REJECTED':
                return { ...baseStyle, backgroundColor: '#dc3545' }; // Red
            case 'INTERVIEWING':
                return { ...baseStyle, backgroundColor: '#ffc107', color: 'black' }; // Yellow with black text
            case 'VIEWED':
                return { ...baseStyle, backgroundColor: '#17a2b8' }; // Teal
            case 'APPLIED':
                return { ...baseStyle, backgroundColor: '#007bff' }; // Blue
            default:
                return { ...baseStyle, backgroundColor: '#6c757d' }; // Gray
        }
    };

    return (
        <div>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                applications.map((app) => (
                    <div key={app.id} className="card" style={{ margin: '15px 0', padding: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                        <h3>{app.jobTitle || 'Job Title Not Available'}</h3>
                        <p><strong>Company:</strong> {app.companyName || 'Company Not Available'}</p>
                        {app.location && <p><strong>Location:</strong> {app.location}</p>}                        <p><strong>Status: </strong><span style={getStatusStyle(app.status)}>{(app.status || 'APPLIED').toUpperCase()}</span></p>
                        <p><strong>Applied on:</strong> {formatDate(app.appliedDate || app.appliedAt)}</p>
                        
                        {onWithdraw && (
                            <button 
                                onClick={() => onWithdraw(app.id)} 
                                style={{ 
                                    backgroundColor: '#dc3545', 
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 15px',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Withdraw Application
                            </button>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default ApplicationList;