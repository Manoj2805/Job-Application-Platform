package com.carrerconnect.jobservice.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrerconnect.jobservice.dto.ApplicationDTO;
import com.carrerconnect.jobservice.dto.JobDTO;
import com.carrerconnect.jobservice.entity.Application;
import com.carrerconnect.jobservice.entity.Job;
import com.carrerconnect.jobservice.exception.CarrerConnectException;
import com.carrerconnect.jobservice.repository.ApplicationRepository;
import com.carrerconnect.jobservice.repository.JobRepository;

@Service
public class JobServiceImpl implements JobService {
    
    @Autowired
    private JobRepository jobRepository;
    
    @Autowired 
    private ApplicationRepository applicationRepository;
  
    
    @Override
    public JobDTO createJob(JobDTO jobDTO) {
        Job job = new Job();
        job.setTitle(jobDTO.getTitle());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setLocation(jobDTO.getLocation());
        job.setJobType(jobDTO.getJobType());
        job.setDescription(jobDTO.getDescription());
        job.setSalary(jobDTO.getSalary());
        job.setUserId(jobDTO.getUserId());

        job = jobRepository.save(job);

        jobDTO.setId(job.getId());
        return jobDTO;
    }

    @Override
    public JobDTO getJobById(Long id) throws CarrerConnectException {
        Optional<Job> jobOpt = jobRepository.findById(id);
        if (jobOpt.isEmpty()) {
            throw new CarrerConnectException("Job.NOT_FOUND");
        }
        Job job = jobOpt.get();
        JobDTO jobDTO = new JobDTO();
        jobDTO.setId(job.getId());
        jobDTO.setTitle(job.getTitle());
        jobDTO.setCompanyName(job.getCompanyName());
        jobDTO.setLocation(job.getLocation());
        jobDTO.setJobType(job.getJobType());
        jobDTO.setDescription(job.getDescription());
        jobDTO.setSalary(job.getSalary());
        jobDTO.setUserId(job.getUserId());
        return jobDTO;
    }

    @Override
    public List<JobDTO> getAllJobs() {
        return jobRepository.findAll().stream().map(job -> {
            JobDTO dto = new JobDTO();
            dto.setId(job.getId());
            dto.setTitle(job.getTitle());
            dto.setCompanyName(job.getCompanyName());
            dto.setLocation(job.getLocation());
            dto.setJobType(job.getJobType());
            dto.setDescription(job.getDescription());
            dto.setSalary(job.getSalary());
            dto.setUserId(job.getUserId());
            return dto;
        }).collect(Collectors.toList());
    }
    
    public List<ApplicationDTO> getApplicationsForJob(Long jobId) {
        List<Application> applications = applicationRepository.findByJobId(jobId);
        return applications.stream().map(app -> {
            ApplicationDTO dto = new ApplicationDTO();
            dto.setId(app.getId());
            dto.setUserId(app.getUserId());
            dto.setJobId(app.getJobId());
            dto.setStatus(app.getStatus());
            dto.setAppliedDate(app.getAppliedDate());
            return dto;
        }).collect(Collectors.toList());
    }
    
    @Override
    public List<JobDTO> getJobsByUserId(Long userId) {
        return jobRepository.findByUserId(userId).stream().map(job -> {
            JobDTO dto = new JobDTO();
            dto.setId(job.getId());
            dto.setTitle(job.getTitle());
            dto.setCompanyName(job.getCompanyName());
            dto.setLocation(job.getLocation());
            dto.setJobType(job.getJobType());
            dto.setDescription(job.getDescription());
            dto.setSalary(job.getSalary());
            dto.setUserId(job.getUserId());
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public JobDTO updateJob(Long id, JobDTO jobDTO) {
        Optional<Job> jobOpt = jobRepository.findById(id);
        if (jobOpt.isEmpty()) {
            return null;
        }

        Job job = jobOpt.get();
        job.setTitle(jobDTO.getTitle());
        job.setCompanyName(jobDTO.getCompanyName());
        job.setLocation(jobDTO.getLocation());
        job.setJobType(jobDTO.getJobType());
        job.setDescription(jobDTO.getDescription());
        job.setSalary(jobDTO.getSalary());
        job.setUserId(jobDTO.getUserId());

        job = jobRepository.save(job);
        jobDTO.setId(job.getId());
        return jobDTO;
    }

   
    
    @Override
    public void deleteJob(Long id) throws CarrerConnectException {
        if (!jobRepository.existsById(id)) {
            throw new CarrerConnectException("Job.NOT_FOUND");
        }
        jobRepository.deleteById(id);
    }
}