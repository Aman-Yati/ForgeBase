package com.forgebase.service;

import com.forgebase.dto.CreateJobRequest;
import com.forgebase.dto.JobRequestDTO;
import com.forgebase.dto.JobResponseDTO;
import com.forgebase.dto.UpdateJobRequest;
import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;

import java.util.List;

public interface JobServiceInterface {
    JobResponseDTO createJob(CreateJobRequest request, String authenticatedUserId);
    JobResponseDTO getJobById(String id, String authenticatedUserId);
    List<JobResponseDTO> getAllJobs(String authenticatedUserId);
    List<JobResponseDTO> getJobsByUserId(String userId, String authenticatedUserId);
    List<JobResponseDTO> getJobsByUserIdAndStatus(String userId, ApplicationStatus status, String authenticatedUserId);
    List<JobResponseDTO> getJobsByCompany(String company, String authenticatedUserId);
    JobResponseDTO updateJob(String id, UpdateJobRequest dto, String authenticatedUserId);
    void deleteJob(String id, String authenticatedUserId);
    void deleteJobsByUserId(String userId, String authenticatedUserId);
    List<JobResponseDTO> getJobsWithFilters(String authenticatedUserId, ApplicationStatus status, JobType jobType, WorkMode workMode, Priority priority, String search);
    JobResponseDTO updateJobStatus(String id, ApplicationStatus status, String authenticatedUserId);
    JobResponseDTO updateJobPriority(String id, Priority priority, String authenticatedUserId);
}
