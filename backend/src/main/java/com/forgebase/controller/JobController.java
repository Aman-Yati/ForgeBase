package com.forgebase.controller;

import com.forgebase.dto.CreateJobRequest;
import com.forgebase.dto.JobResponseDTO;
import com.forgebase.dto.UpdateJobRequest;
import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import com.forgebase.exception.AccessDeniedException;
import com.forgebase.service.JobServiceInterface;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobServiceInterface jobService;

    private String getUserIdFromRequest() {
        Object userIdObj = org.springframework.web.context.request.RequestContextHolder
                .currentRequestAttributes()
                .getAttribute("userId", org.springframework.web.context.request.RequestAttributes.SCOPE_REQUEST);
        if (userIdObj == null) {
            throw new AccessDeniedException("User ID not found in request");
        }
        return userIdObj.toString();
    }

    @PostMapping
    public ResponseEntity<JobResponseDTO> createJob(@Valid @RequestBody CreateJobRequest request) {
        String authenticatedUserId = getUserIdFromRequest();
        JobResponseDTO createdJob = jobService.createJob(request, authenticatedUserId);
        return new ResponseEntity<>(createdJob, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponseDTO> getJobById(@PathVariable String id) {
        String authenticatedUserId = getUserIdFromRequest();
        JobResponseDTO job = jobService.getJobById(id, authenticatedUserId);
        return ResponseEntity.ok(job);
    }

    @GetMapping
    public ResponseEntity<List<JobResponseDTO>> getAllJobs(
            @RequestParam(required = false) ApplicationStatus status,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) WorkMode workMode,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String search) {
        String authenticatedUserId = getUserIdFromRequest();
        if (status == null && jobType == null && workMode == null && priority == null && search == null) {
            List<JobResponseDTO> jobs = jobService.getAllJobs(authenticatedUserId);
            return ResponseEntity.ok(jobs);
        }
        List<JobResponseDTO> jobs = jobService.getJobsWithFilters(authenticatedUserId, status, jobType, workMode, priority, search);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<JobResponseDTO>> getJobsByUserId(@PathVariable String userId) {
        String authenticatedUserId = getUserIdFromRequest();
        List<JobResponseDTO> jobs = jobService.getJobsByUserId(userId, authenticatedUserId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<JobResponseDTO>> getJobsByUserIdAndStatus(
            @PathVariable String userId,
            @PathVariable ApplicationStatus status) {
        String authenticatedUserId = getUserIdFromRequest();
        List<JobResponseDTO> jobs = jobService.getJobsByUserIdAndStatus(userId, status, authenticatedUserId);
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/company/{company}")
    public ResponseEntity<List<JobResponseDTO>> getJobsByCompany(@PathVariable String company) {
        String authenticatedUserId = getUserIdFromRequest();
        List<JobResponseDTO> jobs = jobService.getJobsByCompany(company, authenticatedUserId);
        return ResponseEntity.ok(jobs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponseDTO> updateJob(
            @PathVariable String id,
            @Valid @RequestBody UpdateJobRequest dto) {
        String authenticatedUserId = getUserIdFromRequest();
        JobResponseDTO updatedJob = jobService.updateJob(id, dto, authenticatedUserId);
        return ResponseEntity.ok(updatedJob);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable String id) {
        String authenticatedUserId = getUserIdFromRequest();
        jobService.deleteJob(id, authenticatedUserId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteJobsByUserId(@PathVariable String userId) {
        String authenticatedUserId = getUserIdFromRequest();
        jobService.deleteJobsByUserId(userId, authenticatedUserId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<JobResponseDTO> updateJobStatus(
            @PathVariable String id,
            @RequestBody ApplicationStatus status) {
        String authenticatedUserId = getUserIdFromRequest();
        JobResponseDTO updatedJob = jobService.updateJobStatus(id, status, authenticatedUserId);
        return ResponseEntity.ok(updatedJob);
    }

    @PatchMapping("/{id}/priority")
    public ResponseEntity<JobResponseDTO> updateJobPriority(
            @PathVariable String id,
            @RequestBody Priority priority) {
        String authenticatedUserId = getUserIdFromRequest();
        JobResponseDTO updatedJob = jobService.updateJobPriority(id, priority, authenticatedUserId);
        return ResponseEntity.ok(updatedJob);
    }
}
