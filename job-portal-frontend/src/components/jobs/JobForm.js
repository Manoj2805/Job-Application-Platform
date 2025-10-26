import React, { useState, useEffect, useRef } from 'react';

const fadeInKeyframes = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const JobForm = ({ onSubmit, errors = {}, isSubmitting = false }) => {
    
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
        title: '',
        companyName: '',
        location: '',
        description: '',
        jobType: 'Full-time',
        salary: ''
    });
    
    const [touched, setTouched] = useState({});
    
    const titleRef = useRef(null);
    const companyNameRef = useRef(null);
    const locationRef = useRef(null);
    const descriptionRef = useRef(null);    
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const initialValidation = {};
        Object.keys(formData).forEach(field => {
            if (field === 'salary' && !formData[field]) {
                return;
            }
            initialValidation[field] = validateField(field, formData[field]);
        });
        setFormErrors(initialValidation);
    
    }, []);
    
    
    const validateField = (name, value) => {
        let error = '';
        
        if (name === 'title') {
            if (!value.trim()) {
                error = 'Job title is required';
            } else if (value.length < 5) {
                error = 'Job title must be at least 5 characters';
            }
        }
        
        if (name === 'companyName') {
            if (!value.trim()) {
                error = 'Company name is required';
            }
        }
        
        if (name === 'location') {
            if (!value.trim()) {
                error = 'Location is required';
            }
        }
        
        if (name === 'description') {
            if (!value.trim()) {
                error = 'Job description is required';
            } else if (value.length < 20) {
                error = 'Please provide a more detailed job description (min 20 characters)';
            }
        }
        
        if (name === 'salary') {
            if (value && (isNaN(value) || Number(value) < 0)) {
                error = 'Salary must be a positive number';
            }
        }
        
        return error;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        
        
        if (!touched[name]) {
            setTouched(prev => ({ ...prev, [name]: true }));
        }
        
     
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
        
        
        const allTouched = Object.keys(formData).reduce((acc, key) => {
            acc[key] = true;
            return acc;
        }, {});
        setTouched(allTouched);
        
        
        const validationErrors = {};
        Object.keys(formData).forEach(field => {
            if (field === 'salary' && !formData[field]) {
                return;
            }
            
            const error = validateField(field, formData[field]);
            if (error) {
                validationErrors[field] = error;
            }
        });
        
        setFormErrors(validationErrors);
        
        
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        } else {
          
            const firstErrorField = Object.keys(validationErrors)[0];
            if (firstErrorField === 'title' && titleRef.current) {
                titleRef.current.focus();
            } else if (firstErrorField === 'companyName' && companyNameRef.current) {
                companyNameRef.current.focus();
            } else if (firstErrorField === 'location' && locationRef.current) {
                locationRef.current.focus();
            } else if (firstErrorField === 'description' && descriptionRef.current) {
                descriptionRef.current.focus();
            }
        }
    };

   
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstErrorField = Object.keys(errors)[0];
            if (firstErrorField === 'title' && titleRef.current) {
                titleRef.current.focus();
            } else if (firstErrorField === 'companyName' && companyNameRef.current) {
                companyNameRef.current.focus();
            } else if (firstErrorField === 'location' && locationRef.current) {
                locationRef.current.focus();
            } else if (firstErrorField === 'description' && descriptionRef.current) {
                descriptionRef.current.focus();
            }
        }
    }, [errors]);    
    const shouldShowError = (field) => {

        const hasError = formErrors[field] || errors[field];
        
        
        return (touched[field] && formErrors[field]) || errors[field];
    };
    
    
    const getErrorMessage = (field) => {

        return formErrors[field] || errors[field];
    };
    
    
    const inputStyle = (field) => ({
        width: '100%',
        padding: '10px',
        marginBottom: '5px',
        borderRadius: '4px',
        border: shouldShowError(field) ? '1px solid #ff0000' : '1px solid #ccc',
        boxSizing: 'border-box'
    });    // Error message style
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
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
            <div style={formGroupStyle}>
                <label htmlFor="title" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Job Title*
                </label>
                <input 
                    id="title"
                    name="title" 
                    value={formData.title} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="e.g., Senior Software Engineer" 
                    style={inputStyle('title')}
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('title') ? "true" : "false"}
                    aria-describedby={shouldShowError('title') ? "title-error" : undefined}
                    ref={titleRef}
                    required
                />
                {shouldShowError('title') && <span id="title-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('title')}</span>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="companyName" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Company Name*
                </label>
                <input 
                    id="companyName"
                    name="companyName" 
                    value={formData.companyName} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="e.g., Acme Corporation" 
                    style={inputStyle('companyName')} 
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('companyName') ? "true" : "false"}
                    aria-describedby={shouldShowError('companyName') ? "companyName-error" : undefined}
                    ref={companyNameRef}
                    required
                />
                {shouldShowError('companyName') && <span id="companyName-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('companyName')}</span>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="location" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Location*
                </label>
                <input 
                    id="location"
                    name="location" 
                    value={formData.location} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="e.g., New York, NY or Remote" 
                    style={inputStyle('location')} 
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('location') ? "true" : "false"}
                    aria-describedby={shouldShowError('location') ? "location-error" : undefined}
                    ref={locationRef}
                    required
                />
                {shouldShowError('location') && <span id="location-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('location')}</span>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Job Description*
                </label>
                <textarea 
                    id="description"
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="Detailed job description including responsibilities, requirements, and benefits" 
                    style={{ ...inputStyle('description'), minHeight: '120px' }}
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('description') ? "true" : "false"}
                    aria-describedby={shouldShowError('description') ? "description-error" : undefined}
                    ref={descriptionRef}
                    required
                />
                {shouldShowError('description') && <span id="description-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('description')}</span>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="salary" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Salary (Annual)
                </label>
                <input 
                    id="salary"
                    name="salary" 
                    type="number" 
                    value={formData.salary} 
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    placeholder="e.g., 75000" 
                    style={inputStyle('salary')} 
                    disabled={isSubmitting}
                    aria-invalid={shouldShowError('salary') ? "true" : "false"}
                    aria-describedby={shouldShowError('salary') ? "salary-error" : undefined}
                />
                {shouldShowError('salary') && <span id="salary-error" style={errorStyle} role="alert">⚠️ {getErrorMessage('salary')}</span>}
            </div>

            <div style={formGroupStyle}>
                <label htmlFor="jobType" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Job Type
                </label>
                <select 
                    id="jobType"
                    name="jobType" 
                    value={formData.jobType} 
                    onChange={handleChange}
                    style={inputStyle('jobType')}
                    disabled={isSubmitting}
                >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                    <option value="Internship">Internship</option>
                    <option value="Temporary">Temporary</option>
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
                {isSubmitting ? 'Submitting...' : 'Submit Job'}
            </button>
        </form>
    );
};

export default JobForm;