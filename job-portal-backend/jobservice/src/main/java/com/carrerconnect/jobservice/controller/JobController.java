package com.carrerconnect.jobservice.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carrerconnect.jobservice.dto.ApplicationDTO;
import com.carrerconnect.jobservice.dto.JobDTO;
import com.carrerconnect.jobservice.exception.CarrerConnectException;
import com.carrerconnect.jobservice.service.JobService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;



@RestController
@RequestMapping("/jobs")
@Validated // Enables method parameter validation (e.g., @PathVariable, @RequestParam)
public class JobController {

    @Autowired
    private JobService jobService;

    @PostMapping
    public ResponseEntity<JobDTO> createJob(@Valid @RequestBody JobDTO jobDTO) {
        return ResponseEntity.ok(jobService.createJob(jobDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobDTO> getJobById(
        @PathVariable @Min(value = 1, message = "Job ID must be greater than 0") Long id
    ) throws CarrerConnectException {
        return ResponseEntity.ok(jobService.getJobById(id));
    }
    
    
    @GetMapping
    public ResponseEntity<List<JobDTO>> getAllJobs() {
        return ResponseEntity.ok(jobService.getAllJobs());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobDTO>> getJobsByUserId(
        @PathVariable @Min(value = 1, message = "User ID must be greater than 0") Long userId
    ) throws CarrerConnectException {
    	  List<JobDTO> jobs = jobService.getJobsByUserId(userId);
    	    if (jobs == null || jobs.isEmpty()) {
    	        throw new CarrerConnectException("Job.NOT_FOUND");
    	    }
    	    return ResponseEntity.ok(jobs);
    }
    
    @GetMapping("/{id}/applications")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsForJob(
        @PathVariable @Min(value = 1, message = "Job ID must be greater than 0") Long id
    ) {
        return ResponseEntity.ok(jobService.getApplicationsForJob(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<JobDTO> updateJob(
        @PathVariable @Min(value = 1, message = "Job ID must be greater than 0") Long id,
        @Valid @RequestBody JobDTO jobDTO
    ) {
        return ResponseEntity.ok(jobService.updateJob(id, jobDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteJob(
        @PathVariable @Min(value = 1, message = "Job ID must be greater than 0") Long id
    ) throws CarrerConnectException {
        jobService.deleteJob(id);
        return ResponseEntity.ok("Job deleted successfully with ID: " + id);
    }
}