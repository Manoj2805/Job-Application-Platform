package com.carrerconnect.jobservice.service;

import java.util.List;

import com.carrerconnect.jobservice.dto.ApplicationDTO;
import com.carrerconnect.jobservice.dto.JobDTO;
import com.carrerconnect.jobservice.exception.CarrerConnectException;

public interface JobService {
    JobDTO createJob(JobDTO jobDTO);
    JobDTO getJobById(Long id) throws CarrerConnectException;
    List<JobDTO> getAllJobs();
    List<JobDTO> getJobsByUserId(Long userId) throws CarrerConnectException;
    JobDTO updateJob(Long id, JobDTO jobDTO);
    void deleteJob(Long id) throws CarrerConnectException;
    
    // Add this method for job applications
    List<ApplicationDTO> getApplicationsForJob(Long jobId);
}
