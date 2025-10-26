import React, { useState, useEffect, useRef } from 'react';


const fadeInKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes highlightError {
  0% { background-color: rgba(255, 0, 0, 0.05); }
  50% { background-color: rgba(255, 0, 0, 0.15); }
  100% { background-color: rgba(255, 0, 0, 0.05); }
}
`;

const UserForm = ({ onSubmit, errors = {}, isSubmitting = false }) => {
   
    useEffect(() => {
       
        if (!document.getElementById('form-animations')) {
            const styleElement = document.createElement('style');
            styleElement.id = 'form-animations';
            styleElement.textContent = fadeInKeyframes;
            document.head.appendChild(styleElement);
            
            return () => {
                document.head.removeChild(styleElement);
            };
        }
    }, []);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'JOB_SEEKER'
    });
    
    const [touched, setTouched] = useState({
        name: false,
        email: false
    });
    
    
    const nameRef = useRef(null);
    const emailRef = useRef(null);
      
    useEffect(() => {
        if (Object.keys(errors).length === 0 && !isSubmitting) {
            setFormData({ name: '', email: '', role: 'JOB_SEEKER' });
            setTouched({ name: false, email: false });
            setFormErrors({}); 
        }
    }, [errors, isSubmitting]);
     
    useEffect(() => {
        const initialValidation = {};
        Object.keys(formData).forEach(field => {
            if (field === 'name' || field === 'email') {
                initialValidation[field] = validateField(field, formData[field]);
            }
        });
        setFormErrors(initialValidation);
    
    }, []);

    
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField === 'name' && nameRef.current) {
                nameRef.current.focus();
            } else if (firstErrorField === 'email' && emailRef.current) {
                emailRef.current.focus();
            }
        }
    }, [errors]);    // State for form-level validation errors
    const [formErrors, setFormErrors] = useState({});
    
    // Validate a single field
    const validateField = (name, value) => {
        let error = '';
        
        if (name === 'name') {
            if (!value.trim()) {
                error = 'Name is required';
            } else if (value.length < 3) {
                error = 'Name must be at least 3 characters';
            }
        }
        
        if (name === 'email') {
            if (!value.trim()) {
                error = 'Email is required';
             } 
             else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    error = 'Please enter a valid email address';
                }
            }
        }
        
        return error;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        // Mark field as touched when user starts typing
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
        }
        
        // Validate on change
        const error = validateField(name, value);
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };
    
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        
        const error = validateField(name, formData[name]);
        setFormErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };    const handleSubmit = (e) => {
        e.preventDefault();
        
       
        setTouched({
            name: true,
            email: true
        });
        
        
        const validationErrors = {};
        Object.keys(formData).forEach(field => {
            if (field === 'name' || field === 'email') { 
                const error = validateField(field, formData[field]);
                if (error) {
                    validationErrors[field] = error;
                }
            }
        });
        
        setFormErrors(validationErrors);
        
      
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
        
            if (validationErrors.name && nameRef.current) {
                nameRef.current.focus();
            } else if (validationErrors.email && emailRef.current) {
                emailRef.current.focus();
            }
        }
    };    
    const shouldShowError = (field) => {
        
        const hasError = formErrors[field] || errors[field];
        
        
        return (touched[field] && formErrors[field]) || errors[field];
    };
    
    
    const getErrorMessage = (field) => {
        
        return formErrors[field] || errors[field];
    };
    
   
    const getInputStyle = (fieldName) => ({
        width: '100%',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '4px',
        border: shouldShowError(fieldName) ? '1px solid #ff0000' : '1px solid #ccc',
        boxSizing: 'border-box'
    });      // Error message style
    const errorStyle = {
        color: '#ff0000',
        fontSize: '13px',
        marginBottom: '15px',
        display: 'block',
        fontWeight: '500',
        padding: '4px 8px',
        fontFamily: 'Arial, sans-serif',
        animation: 'fadeIn 0.3s ease-in-out',
        backgroundColor: 'rgba(255, 0, 0, 0.05)',
        borderRadius: '3px'
    };
    
    
    const formGroupStyle = {
        marginBottom: '15px'
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
            <div style={formGroupStyle}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Full Name*
                </label>                <input 
                    id="name"
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Enter your full name" 
                    style={getInputStyle('name')}
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('name') ? "true" : "false"}
                    aria-describedby={shouldShowError('name') ? "name-error" : undefined}
                    ref={nameRef}
                    required
                />
                {shouldShowError('name') && <span id="name-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('name')}</span>}
            </div>
            
            <div style={formGroupStyle}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Email Address*
                </label>                <input 
                    id="email"
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Enter your email address" 
                    style={getInputStyle('email')}
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('email') ? "true" : "false"}
                    aria-describedby={shouldShowError('email') ? "email-error" : undefined}
                    ref={emailRef}
                    required
                />
                {shouldShowError('email') && <span id="email-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('email')}</span>}
            </div>
            
            <div style={formGroupStyle}>
                <label htmlFor="role" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                   Role
                </label>
                <select 
                    id="role"
                    name="role" 
                    value={formData.role} 
                    onChange={handleChange}
                    style={getInputStyle('role')}
                    disabled={isSubmitting}
                >
                    <option value="USER">User</option>
                    <option value="RECRUITER">Recruiter</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
            
            <button 
                type="submit"
                disabled={isSubmitting}
                style={{
                    padding: '10px 20px',
                    backgroundColor: isSubmitting ? '#cccccc' : '#8A2BE2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginTop: '10px'
                }}
            >
                {isSubmitting ? 'Creating...' : 'Create User'}
            </button>
        </form>
    );
};

export default UserForm;