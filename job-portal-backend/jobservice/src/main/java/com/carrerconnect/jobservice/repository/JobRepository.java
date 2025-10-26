package com.carrerconnect.jobservice.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.carrerconnect.jobservice.entity.Job;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByUserId(Long userId);
    List<Job> findByCompanyName(String companyName);
    List<Job> findByJobType(String jobType);
}
