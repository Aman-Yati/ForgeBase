package com.forgebase.mapper;

import com.forgebase.dto.JobRequestDTO;
import com.forgebase.dto.JobResponseDTO;
import com.forgebase.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class JobMapper {

    public JobResponseDTO toResponseDTO(Job job) {
        if (job == null) {
            return null;
        }
        return new JobResponseDTO(
            job.getId(),
            job.getCompany(),
            job.getRole(),
            job.getLocation(),
            job.getSalaryMin(),
            job.getSalaryMax(),
            job.getJobType(),
            job.getWorkMode(),
            job.getStatus(),
            job.getPriority(),
            job.getAppliedDate(),
            job.getJobUrl(),
            job.getNotes(),
            job.getUserId(),
            job.getCreatedAt(),
            job.getUpdatedAt()
        );
    }

    public Job toEntity(JobRequestDTO dto) {
        if (dto == null) {
            return null;
        }
        Job job = new Job();
        job.setCompany(dto.getCompany());
        job.setRole(dto.getRole());
        job.setLocation(dto.getLocation());
        job.setSalaryMin(dto.getSalaryMin());
        job.setSalaryMax(dto.getSalaryMax());
        job.setJobType(dto.getJobType());
        job.setWorkMode(dto.getWorkMode());
        job.setStatus(dto.getStatus());
        job.setPriority(dto.getPriority());
        job.setAppliedDate(dto.getAppliedDate());
        job.setJobUrl(dto.getJobUrl());
        job.setNotes(dto.getNotes());
        job.setUserId(dto.getUserId());
        return job;
    }

    public void updateEntityFromDTO(JobRequestDTO dto, Job job) {
        if (dto == null || job == null) {
            return;
        }
        if (dto.getCompany() != null) {
            job.setCompany(dto.getCompany());
        }
        if (dto.getRole() != null) {
            job.setRole(dto.getRole());
        }
        if (dto.getLocation() != null) {
            job.setLocation(dto.getLocation());
        }
        if (dto.getSalaryMin() != null) {
            job.setSalaryMin(dto.getSalaryMin());
        }
        if (dto.getSalaryMax() != null) {
            job.setSalaryMax(dto.getSalaryMax());
        }
        if (dto.getJobType() != null) {
            job.setJobType(dto.getJobType());
        }
        if (dto.getWorkMode() != null) {
            job.setWorkMode(dto.getWorkMode());
        }
        if (dto.getStatus() != null) {
            job.setStatus(dto.getStatus());
        }
        if (dto.getPriority() != null) {
            job.setPriority(dto.getPriority());
        }
        if (dto.getAppliedDate() != null) {
            job.setAppliedDate(dto.getAppliedDate());
        }
        if (dto.getJobUrl() != null) {
            job.setJobUrl(dto.getJobUrl());
        }
        if (dto.getNotes() != null) {
            job.setNotes(dto.getNotes());
        }
    }
}
