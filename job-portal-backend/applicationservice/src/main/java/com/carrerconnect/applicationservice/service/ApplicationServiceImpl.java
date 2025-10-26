package com.carrerconnect.applicationservice.service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.carrerconnect.applicationservice.ApplicationDTO.ApplicationDTO;
import com.carrerconnect.applicationservice.ApplicationDTO.JobDTO;
import com.carrerconnect.applicationservice.ApplicationDTO.UserDTO;
import com.carrerconnect.applicationservice.entity.Application;
import com.carrerconnect.applicationservice.exception.CarrerConnectException;
import com.carrerconnect.applicationservice.feign.JobServiceFeignClient;
import com.carrerconnect.applicationservice.feign.UserServiceFeignClient;
import com.carrerconnect.applicationservice.repository.ApplicationRepository;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    
	
	@Autowired
	private UserServiceFeignClient userServiceFeign;
	
	@Autowired
	private JobServiceFeignClient jobServiceFeignClient;
	
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    @CircuitBreaker(name = "default", fallbackMethod = "applyForJobFallback")
    public ApplicationDTO applyForJob(ApplicationDTO applicationDTO) throws CarrerConnectException {
        UserDTO user;
        try {
            user = userServiceFeign.getUserById(applicationDTO.getUserId());
        } catch (Exception e) {
            throw new CarrerConnectException("User.NOT_FOUND");
        }
        JobDTO job;
        try {
            job = jobServiceFeignClient.getJobById(applicationDTO.getJobId());
        } catch (Exception e) {
            throw new CarrerConnectException("Job.NOT_FOUND");
        }
        Application entity = new Application();
        entity.setUserId(user.getId());
        entity.setJobId(job.getId());
        entity.setStatus(applicationDTO.getStatus() != null ? applicationDTO.getStatus() : "APPLIED");
        entity.setAppliedDate(applicationDTO.getAppliedDate() != null ? applicationDTO.getAppliedDate() : java.time.LocalDate.now());
        applicationRepository.save(entity);
        applicationDTO.setId(entity.getId());
        applicationDTO.setUserName(user.getName());
        applicationDTO.setJobTitle(job.getTitle());
        applicationDTO.setStatus(entity.getStatus());
        return applicationDTO;
    }
    
    
    public ApplicationDTO applyForJobFallback(ApplicationDTO applicationDTO, Throwable t) {
        ApplicationDTO fallbackDTO = new ApplicationDTO();
        fallbackDTO.setStatus("Service unavailable. Please try again later.");
        return fallbackDTO;
    }
    
    @Override
    public ApplicationDTO getApplicationById(Long id) throws CarrerConnectException {
        Optional<Application> appOpt = applicationRepository.findById(id);
        if (appOpt.isEmpty()) {
            throw new CarrerConnectException("Application.NOT_FOUND");
        }
        Application app = appOpt.get();
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(app.getId());
        dto.setUserId(app.getUserId());
        dto.setJobId(app.getJobId());
        dto.setStatus(app.getStatus());
        dto.setAppliedDate(app.getAppliedDate());
        
        
        // Fetch User and Job info via Feign
        UserDTO user = userServiceFeign.getUserById(app.getUserId());
        JobDTO job = jobServiceFeignClient.getJobById(app.getJobId());
        dto.setUserName(user.getName());
        dto.setJobTitle(job.getTitle());
        return dto;
    }

    @Override
    public List<ApplicationDTO> getAllApplications() {
        return applicationRepository.findAll().stream().map(this::mapToDTOWithFeign).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDTO> getApplicationsByUserId(Long userId) {
        return applicationRepository.findByUserId(userId).stream().map(this::mapToDTOWithFeign).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDTO> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId).stream().map(this::mapToDTOWithFeign).collect(Collectors.toList());
    }
    
//    @Override
//    public List<ApplicationDTO> getApplicationsForJob(Long jobId) {
//        // Fetch applications for the given jobId
//        List<Application> applications = applicationRepository.findByJobId(jobId);
//        // Map Application entities to ApplicationDTOs
//        return applications.stream().map(app -> {
//            ApplicationDTO dto = new ApplicationDTO();
//            dto.setId(app.getId());
//            dto.setUserId(app.getUserId());
//            dto.setJobId(app.getJobId());
//            dto.setStatus(app.getStatus());
//            dto.setAppliedDate(app.getAppliedDate());
//            return dto;
//        }).collect(Collectors.toList());
//    }
    

    @Override
    public ApplicationDTO updateApplicationStatus(Long id, String status) {
//        Optional<Application> appOpt = applicationRepository.findById(id);
//        if (appOpt.isEmpty()) return null;
//
//        Application app = appOpt.get();
//        app.setStatus(status);
//        applicationRepository.save(app);
//        ApplicationDTO dto = new ApplicationDTO();
//        UserDTO user = userServiceFeign.getUserById(app.getUserId());
//        JobDTO job = jobServiceFeignClient.getJobById(app.getJobId());
//         dto.setUserName(user.getName());
//        dto.setJobTitle(job.getTitle());
//        return mapToDTO(app);
    	
    	
    	  Application entity = applicationRepository.findById(id)
                  .orElseThrow(() -> new RuntimeException("Application not found"));

          entity.setStatus(status);
          applicationRepository.save(entity);

          ApplicationDTO dto = new ApplicationDTO();
          dto.setId(entity.getId());
          dto.setUserId(entity.getUserId());
          dto.setJobId(entity.getJobId());
          dto.setStatus(entity.getStatus());

          
          UserDTO user = userServiceFeign.getUserById(entity.getUserId());
          JobDTO job = jobServiceFeignClient.getJobById(entity.getJobId());
          dto.setUserName(user.getName());
          dto.setJobTitle(job.getTitle());

          return dto;
    }

    @Override
    public void deleteApplication(Long id) throws CarrerConnectException {
        if (!applicationRepository.existsById(id)) {
            throw new CarrerConnectException("Application.NOT_FOUND");
        }
        applicationRepository.deleteById(id);
    }

    private ApplicationDTO mapToDTOWithFeign(Application app) {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setId(app.getId());
        dto.setUserId(app.getUserId());
        dto.setJobId(app.getJobId());
        dto.setStatus(app.getStatus());
        dto.setAppliedDate(app.getAppliedDate());
        
        
        // Fetch User and Job info via Feign
        UserDTO user = userServiceFeign.getUserById(app.getUserId());
        JobDTO job = jobServiceFeignClient.getJobById(app.getJobId());
        dto.setUserName(user.getName());
        dto.setJobTitle(job.getTitle());
        return dto;
    }
}