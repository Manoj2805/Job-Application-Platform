import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);    // Define the primary color theme (purple gradient instead of blue)
    const primaryColor = '#8A2BE2'; // Violet Blue
    
    return (
        <div style={{ 
            fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            color: '#2D3748',
            margin: '0',
            padding: '0',
            backgroundColor: '#FAFBFC',
        }}>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'transparent',
                padding: '15px 0',
                transition: 'all 0.3s ease',
                boxShadow: scrolled ? '0 2px 15px rgba(0, 0, 0, 0.08)' : 'none',
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '1.5rem',
                        color: scrolled ? primaryColor : '#fff',
                        textShadow: scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <span style={{
                            marginRight: '10px',
                            fontSize: '1.8rem',
                        }}>✦</span>
                        Job Portal
                    </div>
                    <div>
                        <Link to="/jobs" style={{
                            margin: '0 15px',
                            textDecoration: 'none',
                            color: scrolled ? primaryColor : '#fff',
                            fontWeight: '500',
                            textShadow: scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.2)',
                            position: 'relative',
                            padding: '5px 0',
                        }}
                        onMouseOver={(e) => {
                            const line = document.createElement('div');
                            line.style.position = 'absolute';
                            line.style.bottom = '0';
                            line.style.left = '0';
                            line.style.width = '0';
                            line.style.height = '2px';
                            line.style.backgroundColor = scrolled ? primaryColor : '#fff';
                            line.style.transition = 'width 0.3s ease';
                            e.currentTarget.appendChild(line);
                            setTimeout(() => line.style.width = '100%', 10);
                        }}
                        onMouseOut={(e) => {
                            const line = e.currentTarget.querySelector('div');
                            if (line) {
                                line.style.width = '0';
                                setTimeout(() => line.remove(), 300);
                            }
                        }}>Jobs</Link>
                        <Link to="/my-applications" style={{
                            margin: '0 15px',
                            textDecoration: 'none',
                            color: scrolled ? primaryColor : '#fff',
                            fontWeight: '500',
                            textShadow: scrolled ? 'none' : '1px 1px 2px rgba(0,0,0,0.2)',
                            position: 'relative',
                            padding: '5px 0',
                        }}
                        onMouseOver={(e) => {
                            const line = document.createElement('div');
                            line.style.position = 'absolute';
                            line.style.bottom = '0';
                            line.style.left = '0';
                            line.style.width = '0';
                            line.style.height = '2px';
                            line.style.backgroundColor = scrolled ? primaryColor : '#fff';
                            line.style.transition = 'width 0.3s ease';
                            e.currentTarget.appendChild(line);
                            setTimeout(() => line.style.width = '100%', 10);
                        }}
                        onMouseOut={(e) => {
                            const line = e.currentTarget.querySelector('div');
                            if (line) {
                                line.style.width = '0';
                                setTimeout(() => line.remove(), 300);
                            }
                        }}>My Applications</Link>
                    </div>
                </div>
            </div>
{/* Hero Section */}
            <div style={{ 
                textAlign: 'center',
                padding: '120px 20px 100px',
                background: 'linear-gradient(135deg, #9370DB 0%, #8A2BE2 50%, #4B0082 100%)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                marginTop: '-56px', // Offset for navbar
            }}>
                {/* Background Shapes */}
                <div style={{
                    position: 'absolute',
                    top: '10%',
                    left: '5%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 1
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '5%',
                    right: '10%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    zIndex: 1
                }}></div>
{/* Floating Elements - Adding more visual interest */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '20%',
                    width: '60px',
                    height: '60px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'rotate(15deg)',
                    zIndex: 1,
                    animation: 'float 8s ease-in-out infinite'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '30%',
                    left: '15%',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'rotate(-20deg)',
                    zIndex: 1,
                    animation: 'float 6s ease-in-out infinite'
                }}></div>
{/* Content */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '50px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        marginBottom: '20px',
                    }}>
                        ✨ Discover Your Perfect Career Match
                    </div>
                    <h1 style={{ 
                        fontSize: '3.8rem',
                        marginBottom: '20px',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                        background: 'linear-gradient(to right, #ffffff, #f0f0f0)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>Find Your Dream Career</h1>
                    <p style={{ 
                        fontSize: '1.3rem',
                        maxWidth: '700px',
                        margin: '0 auto 40px',
                        lineHeight: '1.6',
                        opacity: 0.9
                    }}>
                        Connect with top employers and discover opportunities that match your skills and ambitions.
                    </p>
                    <div style={{ marginTop: '30px' }}>
                        <Link to="/jobs" style={{ 
                            margin: '10px',
                            padding: '16px 32px',
                            textDecoration: 'none',
                            color: '#8A2BE2',
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            transform: 'translateY(0)',
                            ':hover': {
                                transform: 'translateY(-3px)',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.2)',
                            }
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }}>
                            Find Jobs
                        </Link>
                        <Link to="/post-job" style={{ 
                            margin: '10px',
                            padding: '16px 32px',
                            textDecoration: 'none',
                            color: 'white',
                            backgroundColor: '#FF7E5F', // Coral accent color
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            border: 'none',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            transform: 'translateY(0)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                            ':hover': {
                                backgroundColor: '#FF6347', // Tomato - slightly darker
                                transform: 'translateY(-3px)'
                            }
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6347';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF7E5F';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                        }}>
                            Post a Job
                        </Link>
                    </div>
                </div>
{/* Wave SVG */}
                <div style={{
                    position: 'absolute',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    overflow: 'hidden',
                    lineHeight: '0',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" style={{
                        position: 'relative',
                        display: 'block',
                        width: 'calc(100% + 1.3px)',
                        height: '50px',
                    }}>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#FAFBFC"></path>
                    </svg>
                </div>
{/* Add CSS Animation */}
                <style dangerouslySetInnerHTML={{__html: `
                    @keyframes float {
                        0% { transform: translateY(0) rotate(15deg); }
                        50% { transform: translateY(-15px) rotate(15deg); }
                        100% { transform: translateY(0) rotate(15deg); }
                    }
                `}} />
            </div>
{/* Stats Section */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto 60px',
                padding: '50px 20px 0'
            }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    textAlign: 'center'
                }}>
                    {[
                        { number: '10K+', label: 'Active Jobs', icon: '🚀' },
                        { number: '8.5K+', label: 'Companies', icon: '🏢' },
                        { number: '15M+', label: 'Job Seekers', icon: '👥' },
                        { number: '95%', label: 'Success Rate', icon: '🌟' }
                    ].map((stat, index) => (
                        <div key={index} style={{
                            margin: '20px',
                            flex: '1 1 200px',
                            padding: '20px',
                            background: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03)',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(226, 232, 240, 0.8)',
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.05)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.03)';
                        }}>
                            <div style={{
                                fontSize: '28px',
                                marginBottom: '10px'
                            }}>{stat.icon}</div>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #8A2BE2, #9370DB)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '10px'
                            }}>{stat.number}</div>
                            <div style={{
                                color: '#718096',
                                fontSize: '1.1rem',
                                fontWeight: '500'
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
{/* Key Features Section */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto 80px',
                padding: '0 20px'
            }}>
                <div style={{ 
                    textAlign: 'center',
                    marginBottom: '50px',
                }}>
                    <span style={{
                        color: '#8A2BE2',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1.2px',
                        background: 'linear-gradient(45deg, #8A2BE2, #9370DB)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>Our Benefits</span>
                    <h2 style={{ 
                        fontSize: '2.5rem',
                        color: '#2D3748',
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>Why Choose Our Platform</h2>
                    <p style={{
                        color: '#718096',
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: '1.6'
                    }}>
                        We connect talented professionals with top companies to create perfect career matches
                    </p>
                </div>
                
                <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '30px'
                }}>
                    {[
                        {
                            icon: '🔍',
                            title: 'Smart Job Search',
                            description: 'Find relevant opportunities instantly with our AI-powered matching system that understands your skills and career goals.',
                            backgroundColor: 'rgba(138, 43, 226, 0.05)',
                            gradient: 'linear-gradient(to bottom, #9370DB, #8A2BE2)'
                        },
                        {
                            icon: '📊',
                            title: 'Application Tracking',
                            description: 'Real-time monitoring of all your applications with status updates and interview scheduling in a unified dashboard.',
                            backgroundColor: 'rgba(138, 43, 226, 0.05)',
                            gradient: 'linear-gradient(to bottom, #9370DB, #8A2BE2)'
                        },
                        {
                            icon: '🌟',
                            title: 'Career Development',
                            description: 'Access resources, skill assessments and personalized recommendations to help you grow and advance in your career journey.',
                            backgroundColor: 'rgba(138, 43, 226, 0.05)',
                            gradient: 'linear-gradient(to bottom, #9370DB, #8A2BE2)'
                        }
                    ].map((feature, index) => (
                        <div 
                            key={index}
                            style={{ 
                                flex: '1 1 300px',
                                padding: '40px 30px',
                                borderRadius: '12px',
                                backgroundColor: 'white',
                                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03), 0 6px 10px rgba(0, 0, 0, 0.02)',
                                transition: 'all 0.3s ease',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03)';
                                
                                // Get the icon element and apply special effect
                                const iconElement = e.currentTarget.querySelector('.feature-icon');
                                if (iconElement) {
                                    iconElement.style.transform = 'scale(1.1) rotate(5deg)';
                                }
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.03), 0 6px 10px rgba(0, 0, 0, 0.02)';
                                
                                // Reset icon
                                const iconElement = e.currentTarget.querySelector('.feature-icon');
                                if (iconElement) {
                                    iconElement.style.transform = 'scale(1) rotate(0)';
                                }
                            }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                width: '6px',
                                height: '100%',
                                background: feature.gradient
                            }}></div>
                            <div className="feature-icon" style={{ 
                                width: '80px',
                                height: '80px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: feature.backgroundColor,
                                marginBottom: '25px',
                                transition: 'transform 0.3s ease'
                            }}>
                                <span style={{ 
                                    fontSize: '38px',
                                }}>
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 style={{ 
                                fontSize: '1.5rem',
                                marginBottom: '15px', 
                                color: '#2D3748',
                                fontWeight: '600'
                            }}>
                                {feature.title}
                            </h3>
                            <p style={{ 
                                color: '#718096', 
                                lineHeight: '1.8',
                                fontSize: '1rem'
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
{/* Job Categories Section */}
            <div style={{ 
                background: 'linear-gradient(180deg, rgba(247,250,252,1) 0%, rgba(255,255,255,1) 100%)',
                padding: '80px 20px',
                marginBottom: '0'
            }}>
                <div style={{ 
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}>
                    <div style={{ 
                        textAlign: 'center',
                        marginBottom: '50px',
                    }}>
                        <span style={{
                            color: '#3182CE',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1.2px'
                        }}>Explore Opportunities</span>
                        <h2 style={{ 
                            fontSize: '2.5rem',
                            color: '#2D3748',
                            marginTop: '10px',
                            marginBottom: '20px',
                            fontWeight: 'bold'
                        }}>Popular Job Categories</h2>
                        <p style={{
                            color: '#718096',
                            maxWidth: '700px',
                            margin: '0 auto',
                            fontSize: '1.1rem',
                            lineHeight: '1.6'
                        }}>
                            Browse through the most in-demand categories and find the perfect role for your skills
                        </p>
                    </div>
                    
                    <div style={{ 
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '25px'
                    }}>
                        {[
                            { name: 'Technology', icon: '💻', jobCount: '8,563 jobs' },
                            { name: 'Finance', icon: '📊', jobCount: '3,782 jobs' },
                            { name: 'Marketing', icon: '📱', jobCount: '2,451 jobs' },
                            { name: 'Healthcare', icon: '🏥', jobCount: '4,522 jobs' },
                            { name: 'Engineering', icon: '🔧', jobCount: '3,955 jobs' },
                            { name: 'Education', icon: '🎓', jobCount: '2,128 jobs' },
                            { name: 'Design', icon: '🎨', jobCount: '1,875 jobs' },
                            { name: 'Sales', icon: '📈', jobCount: '3,217 jobs' }
                        ].map(category => (
                            <Link key={category.name} to={`/jobs?category=${category.name}`} style={{
                                textDecoration: 'none',
                                flex: '1 1 250px',
                                maxWidth: '280px',
                            }}>
                                <div style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.03)',
                                    padding: '30px 25px',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(226, 232, 240, 0.8)',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    cursor: 'pointer'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.05)';
                                    e.currentTarget.style.borderColor = 'rgba(66, 153, 225, 0.5)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.03)';
                                    e.currentTarget.style.borderColor = 'rgba(226, 232, 240, 0.8)';
                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        marginBottom: '15px'
                                    }}>{category.icon}</div>
                                    <h3 style={{
                                        fontSize: '1.25rem',
                                        color: '#2D3748',
                                        fontWeight: '600',
                                        marginBottom: '10px'
                                    }}>{category.name}</h3>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#718096',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: 'auto'
                                    }}>
                                        <span style={{
                                            display: 'inline-block',
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: '#3182CE',
                                            marginRight: '8px'
                                        }}></span>
                                        {category.jobCount}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    
                    <div style={{
                        textAlign: 'center',
                        marginTop: '50px'
                    }}>
                        <Link to="/jobs" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: '#3182CE',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = '#2C5282';
                            e.currentTarget.querySelector('svg').style.transform = 'translateX(5px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = '#3182CE';
                            e.currentTarget.querySelector('svg').style.transform = 'translateX(0)';
                        }}>
                            Browse All Categories
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                                marginLeft: '8px',
                                transition: 'transform 0.3s ease'
                            }}>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
{/* Testimonials Section */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto 80px',
                padding: '40px 20px'
            }}>
                <div style={{ 
                    textAlign: 'center',
                    marginBottom: '50px',
                }}>
                    <span style={{
                        color: '#3182CE',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'uppercase',
                        letterSpacing: '1.2px'
                    }}>Success Stories</span>
                    <h2 style={{ 
                        fontSize: '2.5rem',
                        color: '#2D3748',
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontWeight: 'bold'
                    }}>What Our Users Say</h2>
                    <p style={{
                        color: '#718096',
                        maxWidth: '700px',
                        margin: '0 auto',
                        fontSize: '1.1rem',
                        lineHeight: '1.6'
                    }}>
                        Thousands of job seekers have found their dream careers through our platform
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '30px'
                }}>
                    {[
                        {
                            name: "Sarah Johnson",
                            position: "Software Developer",
                            company: "Tech Innovations Inc.",
                            quote: "The job-matching algorithm is incredible. I found a position that perfectly matched my skills and career goals within just a week!",
                            avatar: "👩🏻‍💼"
                        },
                        {
                            name: "Michael Chen",
                            position: "Marketing Director",
                            company: "Global Brands",
                            quote: "The application tracking feature made my job search so much more organized. I could see exactly where I stood with each company.",
                            avatar: "👨🏻‍💼"
                        },
                        {
                            name: "Aisha Patel",
                            position: "HR Manager",
                            company: "Future Enterprises",
                            quote: "As an employer, this platform has transformed our recruitment process. We've found exceptional talent quickly and efficiently.",
                            avatar: "👩🏽‍💼"
                        }
                    ].map((testimonial, index) => (
                        <div key={index} style={{
                            flex: '1 1 300px',
                            backgroundColor: 'white',
                            padding: '35px 30px',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.03), 0 6px 10px rgba(0, 0, 0, 0.02)',
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            border: '1px solid rgba(226, 232, 240, 0.8)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.03)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.03), 0 6px 10px rgba(0, 0, 0, 0.02)';
                        }}>
                            <div style={{
                                fontSize: '60px',
                                color: 'rgba(66, 153, 225, 0.1)',
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                fontFamily: 'Georgia, serif',
                                lineHeight: 1
                            }}>"</div>
                            <p style={{
                                color: '#4A5568',
                                fontSize: '1.05rem',
                                lineHeight: '1.8',
                                marginBottom: '25px',
                                position: 'relative',
                                zIndex: 1
                            }}>"{testimonial.quote}"</p>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'rgba(66, 153, 225, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px',
                                    fontSize: '25px'
                                }}>{testimonial.avatar}</div>
                                <div>
                                    <div style={{
                                        fontWeight: '600',
                                        color: '#2D3748',
                                        fontSize: '1.1rem'
                                    }}>{testimonial.name}</div>
                                    <div style={{
                                        fontSize: '0.9rem',
                                        color: '#718096'
                                    }}>{testimonial.position}, {testimonial.company}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
{/* Call to Action Section */}
            <div style={{
                background: 'linear-gradient(135deg, #8A2BE2 0%, #4B0082 100%)',
                padding: '80px 20px',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Elements */}
                <div style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: '5%',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    zIndex: 0
                }}></div>
{/* Decorative Elements */}
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '15%',
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    transform: 'rotate(15deg)',
                    zIndex: 0
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '25%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    transform: 'rotate(-20deg)',
                    zIndex: 0
                }}></div>

                <div style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '50px',
                        padding: '8px 16px',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        marginBottom: '20px',
                    }}>
                        ✨ Take Your Next Career Step
                    </div>
                    <h2 style={{ 
                        fontSize: '3rem',
                        marginBottom: '25px',
                        fontWeight: 'bold'
                    }}>Ready to Transform Your Career?</h2>
                    <p style={{ 
                        fontSize: '1.2rem',
                        maxWidth: '700px',
                        margin: '0 auto 40px',
                        lineHeight: '1.7',
                        opacity: 0.9
                    }}>
                        Whether you're looking for your dream job or ready to explore new opportunities, we have the tools and resources to help you succeed.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <Link to="/jobs" style={{ 
                            padding: '16px 38px',
                            textDecoration: 'none',
                            color: '#8A2BE2',
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            fontSize: '1.1rem'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                        }}>
                            Browse Jobs
                        </Link>
                        <Link to="/my-applications" style={{ 
                            padding: '16px 38px',
                            textDecoration: 'none',
                            color: 'white',
                            backgroundColor: '#FF7E5F', // Coral color
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                            display: 'inline-block',
                            fontSize: '1.1rem'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF6347';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.25)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = '#FF7E5F';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                        }}>
                            My Applications
                        </Link>
                    </div>
                </div>
            </div>
{/* Footer Section */}
            <div style={{
                backgroundColor: '#1A202C',
                color: '#E2E8F0',
                padding: '60px 20px 40px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background decoration */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '5px',
                    background: 'linear-gradient(to right, #8A2BE2, #9370DB, #FF7E5F)',
                }}></div>
                
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        marginBottom: '40px'
                    }}>
                        <div style={{
                            flex: '1 1 300px',
                            marginBottom: '30px',
                            paddingRight: '40px'
                        }}>
                            <div style={{
                                fontSize: '1.6rem',
                                fontWeight: 'bold',
                                marginBottom: '15px',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <span style={{
                                    marginRight: '10px',
                                    fontSize: '1.8rem',
                                    color: '#9370DB'
                                }}>✦</span> 
                                Job Portal
                            </div>
                            <p style={{
                                lineHeight: '1.7',
                                marginBottom: '20px',
                                color: '#A0AEC0',
                                maxWidth: '350px'
                            }}>Connecting talented professionals with leading companies worldwide through our innovative job matching platform.</p>
                            <div style={{
                                display: 'flex',
                                gap: '15px'
                            }}>
                                {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
                                    <a key={social} href={`#${social}`} style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = '#8A2BE2';
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}>
                                        {/* Social icon placeholder */}
                                        <span style={{ fontSize: '14px' }}>
                                            {social === 'facebook' ? 'f' : 
                                             social === 'twitter' ? 't' :
                                             social === 'linkedin' ? 'in' : 'ig'}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div style={{
                            flex: '1 1 180px',
                            marginBottom: '30px'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                color: 'white',
                                position: 'relative',
                                paddingBottom: '10px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '30px',
                                    height: '3px',
                                    background: '#9370DB'
                                }}></span>
                                For Job Seekers
                            </h3>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0
                            }}>
                                {['Browse Jobs', 'My Applications', 'Career Resources', 'Resume Builder', 'Job Alerts'].map((item, i) => (
                                    <li key={i} style={{ marginBottom: '12px' }}>
                                        <Link to="#" style={{
                                            color: '#A0AEC0',
                                            textDecoration: 'none',
                                            transition: 'all 0.2s ease',
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.color = '#9370DB';
                                            e.currentTarget.style.paddingLeft = '5px';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.color = '#A0AEC0';
                                            e.currentTarget.style.paddingLeft = '0';
                                        }}>
                                            <span style={{
                                                fontSize: '8px',
                                                marginRight: '8px',
                                                opacity: 0,
                                                transition: 'opacity 0.2s ease'
                                            }}>►</span>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div style={{
                            flex: '1 1 230px',
                            marginBottom: '30px'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                color: 'white',
                                position: 'relative',
                                paddingBottom: '10px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '30px',
                                    height: '3px',
                                    background: '#9370DB'
                                }}></span>
                                Contact Us
                            </h3>
                            <div style={{
                                color: '#A0AEC0',
                                marginBottom: '15px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '15px',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}>
                                <span style={{
                                    color: '#9370DB',
                                    fontSize: '18px'
                                }}>📍</span>
                                <span>1234 Employment Ave., Career City, 56789</span>
                            </div>
                            <div style={{
                                color: '#A0AEC0',
                                marginBottom: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}>
                                <span style={{
                                    color: '#9370DB',
                                    fontSize: '18px'
                                }}>📞</span>
                                <span>+1 (555) 234-5678</span>
                            </div>
                            <div style={{
                                color: '#A0AEC0',
                                marginBottom: '15px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateX(5px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}>
                                <span style={{
                                    color: '#9370DB',
                                    fontSize: '18px'
                                }}>✉️</span>
                                <span>support@jobportal.com</span>
                            </div>
                        </div>
                        
                        <div style={{
                            flex: '1 1 250px',
                            marginBottom: '30px'
                        }}>
                            <h3 style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                color: 'white',
                                position: 'relative',
                                paddingBottom: '10px'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '30px',
                                    height: '3px',
                                    background: '#9370DB'
                                }}></span>
                                Subscribe to Newsletter
                            </h3>
                            <p style={{ color: '#A0AEC0', marginBottom: '15px' }}>
                                Stay updated with the latest job opportunities and career advice
                            </p>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}>
                                <input type="email" placeholder="Your email" style={{
                                    padding: '12px 15px',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(160, 174, 192, 0.3)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    color: 'white',
                                    width: '100%',
                                    fontSize: '0.9rem'
                                }} />
                                <button style={{
                                    padding: '12px 20px',
                                    backgroundColor: '#8A2BE2',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#9370DB';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#8A2BE2';
                                }}>
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        borderTop: '1px solid rgba(160, 174, 192, 0.2)',
                        paddingTop: '30px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            color: '#A0AEC0',
                            marginBottom: '15px'
                        }}>
                            © {new Date().getFullYear()} Job Portal. All rights reserved.
                        </div>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px'
                        }}>
                            <Link to="/about" style={{ color: '#A0AEC0', textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#9370DB'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#A0AEC0'}>
                                About
                            </Link>
                            <Link to="/contact" style={{ color: '#A0AEC0', textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#9370DB'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#A0AEC0'}>
                                Contact
                            </Link>
                            <Link to="/terms" style={{ color: '#A0AEC0', textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#9370DB'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#A0AEC0'}>
                                Terms of Service
                            </Link>
                            <Link to="/privacy" style={{ color: '#A0AEC0', textDecoration: 'none', transition: 'color 0.2s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#9370DB'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#A0AEC0'}>
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;