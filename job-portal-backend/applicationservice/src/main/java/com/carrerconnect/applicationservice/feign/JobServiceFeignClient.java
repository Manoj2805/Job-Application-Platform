package com.carrerconnect.applicationservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.carrerconnect.applicationservice.ApplicationDTO.JobDTO;

@FeignClient(name = "jobservice",url="localhost:8089")
public interface JobServiceFeignClient {

    @GetMapping("/jobs/{id}")
    JobDTO getJobById(@PathVariable("id") Long id);
}
