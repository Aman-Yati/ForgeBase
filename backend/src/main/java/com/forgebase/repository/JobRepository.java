package com.forgebase.repository;

import com.forgebase.entity.Job;
import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {

    List<Job> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Job> findByUserId(String userId);

    List<Job> findByUserIdAndStatus(String userId, ApplicationStatus status);

    List<Job> findByCompany(String company);

    void deleteByUserId(String userId);

    List<Job> findByUserIdAndJobType(String userId, JobType jobType);

    List<Job> findByUserIdAndWorkMode(String userId, WorkMode workMode);

    List<Job> findByUserIdAndPriority(String userId, Priority priority);

    List<Job> findByUserIdAndRoleContainingIgnoreCase(String userId, String role);

    @Query("SELECT j FROM Job j WHERE j.userId = :userId AND " +
           "(:status IS NULL OR j.status = :status) AND " +
           "(:jobType IS NULL OR j.jobType = :jobType) AND " +
           "(:workMode IS NULL OR j.workMode = :workMode) AND " +
           "(:priority IS NULL OR j.priority = :priority) AND " +
           "(:search = '' OR LOWER(j.company) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(j.role) LIKE LOWER(CONCAT('%', :search, '%'))) " +
           "ORDER BY j.createdAt DESC")
    List<Job> findJobsWithFilters(
            @Param("userId") String userId,
            @Param("status") ApplicationStatus status,
            @Param("jobType") JobType jobType,
            @Param("workMode") WorkMode workMode,
            @Param("priority") Priority priority,
            @Param("search") String search
    );
}
