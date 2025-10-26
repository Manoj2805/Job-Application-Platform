package com.carrerconnect.applicationservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.carrerconnect.applicationservice.ApplicationDTO.ApplicationDTO;
import com.carrerconnect.applicationservice.ApplicationDTO.JobDTO;
import com.carrerconnect.applicationservice.ApplicationDTO.UserDTO;
import com.carrerconnect.applicationservice.entity.Application;
import com.carrerconnect.applicationservice.exception.CarrerConnectException;
import com.carrerconnect.applicationservice.feign.JobServiceFeignClient;
import com.carrerconnect.applicationservice.feign.UserServiceFeignClient;
import com.carrerconnect.applicationservice.repository.ApplicationRepository;
import com.carrerconnect.applicationservice.service.ApplicationServiceImpl;

class ApplicationServiceImplTest {
    @Mock
    private UserServiceFeignClient userServiceFeign;
    @Mock
    private JobServiceFeignClient jobServiceFeignClient;
    @Mock
    private ApplicationRepository applicationRepository;
    @InjectMocks
    private ApplicationServiceImpl applicationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void applyForJob_success() throws CarrerConnectException {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setUserId(1L);
        dto.setJobId(2L);
        when(userServiceFeign.getUserById(1L)).thenReturn(new UserDTO());
        when(jobServiceFeignClient.getJobById(2L)).thenReturn(new JobDTO());
        when(applicationRepository.save(any(Application.class))).thenReturn(new Application());
        assertNotNull(applicationService.applyForJob(dto));
    }

    @Test
    void applyForJob_userNotFound() {
        ApplicationDTO dto = new ApplicationDTO();
        dto.setUserId(1L);
        dto.setJobId(2L);
        when(userServiceFeign.getUserById(1L)).thenThrow(new RuntimeException());
        CarrerConnectException ex = assertThrows(CarrerConnectException.class, () -> applicationService.applyForJob(dto));
        assertEquals("User.NOT_FOUND", ex.getMessage());
    }

    

    @Test
    void getApplicationById_notFound() {
        when(applicationRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(CarrerConnectException.class, () -> applicationService.getApplicationById(1L));
    }
    

    @Test
    void deleteApplication_notFound() {
        when(applicationRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(CarrerConnectException.class, () -> applicationService.deleteApplication(1L));
    }
}
