import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Job Portal</Link>
            <div className="navbar-links">
                <NavLink to="/jobs">View Jobs</NavLink>
                <NavLink to="/post-job">Post a Job</NavLink>
                <NavLink to="/my-applications">My Applications</NavLink>
                <NavLink to="/manage-job">Manage Applications</NavLink>
                <NavLink to="/users">Manage Users</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;