import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, deleteUser } from '../api/userService';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (err) {
            console.error('Failed to fetch users.', err);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const validateUserData = (userData) => {
        const errors = {};
        
       
        if (!userData.name.trim()) {
            errors.name = 'Name is required';
        } else if (userData.name.length < 3) {
            errors.name = 'Name must be at least 3 characters';
        }
        
        
        if (!userData.email.trim()) {
            errors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(userData.email)) {
                errors.email = 'Please enter a valid email address';
            }
        }
        
        
        const emailExists = users.some(user => 
            user.email.toLowerCase() === userData.email.toLowerCase()
        );
        
        if (emailExists) {
            errors.email = 'This email is already registered';
        }
        
        return errors;
    };

    const handleCreateUser = async (userData) => {
        const errors = validateUserData(userData);
        setValidationErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            setSubmitting(true);
            try {
                await createUser(userData);
                setSuccessMessage(`User ${userData.name} created successfully!`);
                fetchUsers();
            } catch (err) {
                console.error('Error creating user:', err);
                alert('Failed to create user: ' + (err.response?.data?.message || err.message || 'Unknown error'));
            } finally {
                setSubmitting(false);
            }
        }
    };
    
    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                setSuccessMessage('User deleted successfully!');
                fetchUsers();
            } catch (err) {
                console.error('Error deleting user:', err);
                alert('Failed to delete user: ' + (err.response?.data?.message || err.message || 'Unknown error'));
            }
        }
    };    
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

    return (
        <div>
            <h1>Manage Users</h1>
            <hr/>
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
            
            <h2>Create New User</h2>            {Object.keys(validationErrors).length > 0 && (                <div style={{ 
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
            <UserForm onSubmit={handleCreateUser} errors={validationErrors} isSubmitting={submitting} />
            <hr/>
            <h2>Existing Users</h2>
            <UserList users={users} onDelete={handleDeleteUser} />
        </div>
    );
};

export default UsersPage;