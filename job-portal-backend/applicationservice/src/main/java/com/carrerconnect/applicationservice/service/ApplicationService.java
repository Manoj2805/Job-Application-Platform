package com.carrerconnect.applicationservice.service;


import java.util.List;

import com.carrerconnect.applicationservice.ApplicationDTO.ApplicationDTO;
import com.carrerconnect.applicationservice.exception.CarrerConnectException;

public interface ApplicationService {
    ApplicationDTO applyForJob(ApplicationDTO applicationDTO) throws CarrerConnectException;
    ApplicationDTO getApplicationById(Long id) throws CarrerConnectException;
    List<ApplicationDTO> getAllApplications();
    List<ApplicationDTO> getApplicationsByUserId(Long userId);
    List<ApplicationDTO> getApplicationsByJobId(Long jobId);
    ApplicationDTO updateApplicationStatus(Long id, String status);
    void deleteApplication(Long id) throws CarrerConnectException;
}
