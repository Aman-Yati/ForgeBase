package com.forgebase.dto;

import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import jakarta.validation.constraints.PositiveOrZero;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;

public record UpdateJobRequest(
    String company,

    String role,

    String location,

    @PositiveOrZero(message = "Salary minimum must be zero or positive")
    Integer salaryMin,

    @PositiveOrZero(message = "Salary maximum must be zero or positive")
    Integer salaryMax,

    JobType jobType,

    WorkMode workMode,

    ApplicationStatus status,

    Priority priority,

    LocalDateTime appliedDate,

    @URL(message = "Job URL must be a valid URL")
    String jobUrl,

    String notes
) {
    public UpdateJobRequest {
        if (salaryMin != null && salaryMax != null && salaryMin > salaryMax) {
            throw new IllegalArgumentException("Salary minimum cannot be greater than salary maximum");
        }
    }
}
