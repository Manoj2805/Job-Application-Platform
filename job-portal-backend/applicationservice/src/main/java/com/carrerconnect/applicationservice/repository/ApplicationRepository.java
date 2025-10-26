package com.carrerconnect.applicationservice.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carrerconnect.applicationservice.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    List<Application> findByUserId(Long userId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByStatus(String status);
}
