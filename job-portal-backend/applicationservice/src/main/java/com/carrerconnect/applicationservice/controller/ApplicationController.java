package com.carrerconnect.applicationservice.controller;



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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carrerconnect.applicationservice.ApplicationDTO.ApplicationDTO;
import com.carrerconnect.applicationservice.exception.CarrerConnectException;
import com.carrerconnect.applicationservice.service.ApplicationService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;


@RestController
@RequestMapping("/applications")
@Validated // Enables method parameter validation (e.g., @PathVariable, @RequestParam)
public class ApplicationController {


    @Autowired
    private ApplicationService applicationService;


    @PostMapping
    public ResponseEntity<ApplicationDTO> applyForJob(@Valid @RequestBody ApplicationDTO dto) throws CarrerConnectException {
        return ResponseEntity.ok(applicationService.applyForJob(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDTO> getApplicationById(
        @PathVariable @Min(value = 1, message = "Application ID must be greater than 0") Long id
    ) throws CarrerConnectException {
        return ResponseEntity.ok(applicationService.getApplicationById(id));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    //http://localhost:8089/applications/user/0
    //http://localhost:8089/applications/user/2
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByUser (
        @PathVariable @Min(value = 1, message = "User ID must be greater than 0") Long userId
    ) throws CarrerConnectException{
        List<ApplicationDTO> applications = applicationService.getApplicationsByUserId(userId);
        if (applications == null || applications.isEmpty()) {
            throw new CarrerConnectException("Application.NOT_FOUND");
        }
        return ResponseEntity.ok(applications);
    }

//    @GetMapping("/job/{jobId}")
//    public ResponseEntity<List<ApplicationDTO>> getApplicationsByJob(
//        @PathVariable @Min(value = 1, message = "Job ID must be greater than 0") Long jobId
//    ) {
//        return ResponseEntity.ok(applicationService.getApplicationsForJob(jobId));
//    }
   
    //PUT http://localhost:8089/applications/10/status?status=APPROVED
    @PutMapping("/{id}/status")
    public ResponseEntity<ApplicationDTO> updateStatus(
        @PathVariable @Min(value = 1, message = "Application ID must be greater than 0") Long id,
        @RequestParam @NotBlank(message = "Status is required") String status
    ) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(
        @PathVariable @Min(value = 1, message = "Application ID must be greater than 0") Long id
    ) throws CarrerConnectException {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok("Application deleted successfully with ID: " + id);
    }
}