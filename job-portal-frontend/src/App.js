import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import PostJobPage from './pages/PostJobPage';
import MyApplicationsPage from './pages/MyApplicationsPage';
import ManageApplicationsPage from './pages/ManageApplicationsPage';
import UsersPage from './pages/UsersPage';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/my-applications" element={<MyApplicationsPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/manage-job" element={<ManageApplicationsPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;