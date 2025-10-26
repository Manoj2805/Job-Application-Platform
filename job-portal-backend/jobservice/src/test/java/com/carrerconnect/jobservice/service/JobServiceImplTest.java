package com.carrerconnect.jobservice.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.carrerconnect.jobservice.dto.ApplicationDTO;
import com.carrerconnect.jobservice.dto.JobDTO;
import com.carrerconnect.jobservice.entity.Application;
import com.carrerconnect.jobservice.entity.Job;
import com.carrerconnect.jobservice.exception.CarrerConnectException;
import com.carrerconnect.jobservice.repository.ApplicationRepository;
import com.carrerconnect.jobservice.repository.JobRepository;

class JobServiceImplTest {
    @Mock
    private JobRepository jobRepository;
    @Mock
    private ApplicationRepository applicationRepository;
    @InjectMocks
    private JobServiceImpl jobService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createJob_success() {
        JobDTO jobDTO = new JobDTO();
        jobDTO.setTitle("Java Developer");
        jobDTO.setCompanyName("TestCorp");
        jobDTO.setLocation("Remote");
        jobDTO.setJobType("Full-Time");
        jobDTO.setDescription("Java dev role");
        jobDTO.setSalary(100000.0);
        jobDTO.setUserId(1L);
        Job job = new Job();
        job.setId(10L);
        when(jobRepository.save(any(Job.class))).thenReturn(job);
        JobDTO result = jobService.createJob(jobDTO);
        assertNotNull(result);
        assertEquals(10L, result.getId());
    }

    @Test
    void getJobById_success() throws CarrerConnectException {
        Job job = new Job();
        job.setId(1L);
        job.setTitle("Java Developer");
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        JobDTO result = jobService.getJobById(1L);
        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Java Developer", result.getTitle());
    }

    @Test
    void getJobById_notFound() {
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(CarrerConnectException.class, () -> jobService.getJobById(1L));
    }

    @Test
    void getAllJobs_success() {
        Job job1 = new Job();
        job1.setId(1L);
        job1.setTitle("Java Developer");
        Job job2 = new Job();
        job2.setId(2L);
        job2.setTitle("Python Developer");
        when(jobRepository.findAll()).thenReturn(Arrays.asList(job1, job2));
        List<JobDTO> result = jobService.getAllJobs();
        assertEquals(2, result.size());
        assertEquals("Java Developer", result.get(0).getTitle());
        assertEquals("Python Developer", result.get(1).getTitle());
    }

    @Test
    void getJobsByUserId_success() throws CarrerConnectException {
        Job job = new Job();
        job.setId(1L);
        job.setUserId(5L);
        job.setTitle("Java Developer");
        when(jobRepository.findByUserId(5L)).thenReturn(Arrays.asList(job));
        List<JobDTO> result = jobService.getJobsByUserId(5L);
        assertEquals(1, result.size());
        assertEquals(5L, result.get(0).getUserId());
    }

    @Test
    void updateJob_success() {
        Job job = new Job();
        job.setId(1L);
        job.setTitle("Old Title");
        JobDTO jobDTO = new JobDTO();
        jobDTO.setTitle("New Title");
        jobDTO.setCompanyName("TestCorp");
        jobDTO.setLocation("Remote");
        jobDTO.setJobType("Full-Time");
        jobDTO.setDescription("Updated");
        jobDTO.setSalary(120000.0);
        jobDTO.setUserId(1L);
        when(jobRepository.findById(1L)).thenReturn(Optional.of(job));
        when(jobRepository.save(any(Job.class))).thenReturn(job);
        JobDTO result = jobService.updateJob(1L, jobDTO);
        assertNotNull(result);
        assertEquals("New Title", result.getTitle());
    }

   

    @Test
    void deleteJob_notFound() {
        when(jobRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(CarrerConnectException.class, () -> jobService.deleteJob(1L));
    }

    @Test
    void getApplicationsForJob_success() {
        Application app1 = new Application();
        app1.setId(1L);
        app1.setJobId(2L);
        app1.setUserId(3L);
        Application app2 = new Application();
        app2.setId(2L);
        app2.setJobId(2L);
        app2.setUserId(4L);
        when(applicationRepository.findByJobId(2L)).thenReturn(Arrays.asList(app1, app2));
        List<ApplicationDTO> result = jobService.getApplicationsForJob(2L);
        assertEquals(2, result.size());
        assertEquals(3L, result.get(0).getUserId());
        assertEquals(4L, result.get(1).getUserId());
    }
}
