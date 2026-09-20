package com.forgebase.service;

import com.forgebase.dto.CreateJobRequest;
import com.forgebase.dto.JobRequestDTO;
import com.forgebase.dto.JobResponseDTO;
import com.forgebase.dto.UpdateJobRequest;
import com.forgebase.entity.Job;
import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import com.forgebase.exception.AccessDeniedException;
import com.forgebase.exception.ResourceNotFoundException;
import com.forgebase.mapper.JobMapper;
import com.forgebase.repository.JobRepository;
import com.forgebase.util.CuidGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class JobService implements JobServiceInterface {

    private final JobRepository jobRepository;
    private final JobMapper jobMapper;

    @Override
    public JobResponseDTO createJob(CreateJobRequest request, String authenticatedUserId) {
        Job job = new Job();
        job.setId(CuidGenerator.generateCuid());
        job.setCompany(request.company());
        job.setRole(request.role());
        job.setLocation(request.location());
        job.setSalaryMin(request.salaryMin());
        job.setSalaryMax(request.salaryMax());
        job.setJobType(request.jobType());
        job.setWorkMode(request.workMode());
        job.setStatus(request.status() != null ? request.status() : ApplicationStatus.WISHLIST);
        job.setPriority(request.priority() != null ? request.priority() : Priority.MEDIUM);
        job.setAppliedDate(request.appliedDate());
        job.setJobUrl(request.jobUrl());
        job.setNotes(request.notes());
        job.setUserId(authenticatedUserId);
        Job savedJob = jobRepository.save(job);
        return jobMapper.toResponseDTO(savedJob);
    }

    @Override
    public JobResponseDTO getJobById(String id, String authenticatedUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        if (!job.getUserId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only view your own jobs");
        }
        return jobMapper.toResponseDTO(job);
    }

    @Override
    public List<JobResponseDTO> getAllJobs(String authenticatedUserId) {
        return jobRepository.findByUserIdOrderByCreatedAtDesc(authenticatedUserId).stream()
                .map(jobMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobResponseDTO> getJobsByUserId(String userId, String authenticatedUserId) {
        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only view your own jobs");
        }
        return jobRepository.findByUserId(userId).stream()
                .map(jobMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobResponseDTO> getJobsByUserIdAndStatus(String userId, ApplicationStatus status, String authenticatedUserId) {
        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only view your own jobs");
        }
        return jobRepository.findByUserIdAndStatus(userId, status).stream()
                .map(jobMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobResponseDTO> getJobsByCompany(String company, String authenticatedUserId) {
        return jobRepository.findByCompany(company).stream()
                .filter(job -> job.getUserId().equals(authenticatedUserId))
                .map(jobMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobResponseDTO updateJob(String id, UpdateJobRequest dto, String authenticatedUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        if (!job.getUserId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only update your own jobs");
        }
        if (dto.company() != null) job.setCompany(dto.company());
        if (dto.role() != null) job.setRole(dto.role());
        if (dto.location() != null) job.setLocation(dto.location());
        if (dto.salaryMin() != null) job.setSalaryMin(dto.salaryMin());
        if (dto.salaryMax() != null) job.setSalaryMax(dto.salaryMax());
        if (dto.jobType() != null) job.setJobType(dto.jobType());
        if (dto.workMode() != null) job.setWorkMode(dto.workMode());
        if (dto.status() != null) job.setStatus(dto.status());
        if (dto.priority() != null) job.setPriority(dto.priority());
        if (dto.appliedDate() != null) job.setAppliedDate(dto.appliedDate());
        if (dto.jobUrl() != null) job.setJobUrl(dto.jobUrl());
        if (dto.notes() != null) job.setNotes(dto.notes());
        Job updatedJob = jobRepository.save(job);
        return jobMapper.toResponseDTO(updatedJob);
    }

    @Override
    public void deleteJob(String id, String authenticatedUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        if (!job.getUserId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only delete your own jobs");
        }
        jobRepository.deleteById(id);
    }

    @Override
    public void deleteJobsByUserId(String userId, String authenticatedUserId) {
        if (!userId.equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only delete your own jobs");
        }
        jobRepository.deleteByUserId(userId);
    }

    @Override
    public List<JobResponseDTO> getJobsWithFilters(String authenticatedUserId, ApplicationStatus status, JobType jobType, WorkMode workMode, Priority priority, String search) {
        String normalizedSearch = search == null ? "" : search;
        List<Job> jobs = jobRepository.findJobsWithFilters(authenticatedUserId, status, jobType, workMode, priority, normalizedSearch);
        return jobs.stream()
                .map(jobMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JobResponseDTO updateJobStatus(String id, ApplicationStatus status, String authenticatedUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        if (!job.getUserId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only update your own jobs");
        }
        job.setStatus(status);
        Job updatedJob = jobRepository.save(job);
        return jobMapper.toResponseDTO(updatedJob);
    }

    @Override
    public JobResponseDTO updateJobPriority(String id, Priority priority, String authenticatedUserId) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        if (!job.getUserId().equals(authenticatedUserId)) {
            throw new AccessDeniedException("You can only update your own jobs");
        }
        job.setPriority(priority);
        Job updatedJob = jobRepository.save(job);
        return jobMapper.toResponseDTO(updatedJob);
    }
}
