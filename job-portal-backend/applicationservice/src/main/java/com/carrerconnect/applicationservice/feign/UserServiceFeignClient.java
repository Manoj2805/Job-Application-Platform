package com.carrerconnect.applicationservice.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.carrerconnect.applicationservice.ApplicationDTO.UserDTO;

@FeignClient(name = "userservice",url="localhost:8089")
public interface UserServiceFeignClient {

    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable("id") Long id);
}
