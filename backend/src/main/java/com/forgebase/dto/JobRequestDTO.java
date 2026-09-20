package com.forgebase.dto;

import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDTO {
    @NotBlank(message = "Company is required")
    private String company;

    @NotBlank(message = "Role is required")
    private String role;

    private String location;

    private Integer salaryMin;

    private Integer salaryMax;

    private JobType jobType;

    private WorkMode workMode;

    private ApplicationStatus status;

    private Priority priority;

    private LocalDateTime appliedDate;

    private String jobUrl;

    private String notes;

    @NotBlank(message = "User ID is required")
    private String userId;
}
