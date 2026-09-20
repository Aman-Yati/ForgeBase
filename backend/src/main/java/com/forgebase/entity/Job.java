package com.forgebase.entity;

import com.forgebase.entity.enums.ApplicationStatus;
import com.forgebase.entity.enums.JobType;
import com.forgebase.entity.enums.Priority;
import com.forgebase.entity.enums.WorkMode;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "jobs", indexes = {
    @Index(name = "idx_job_user_status", columnList = "userId, status"),
    @Index(name = "idx_job_company", columnList = "company"),
    @Index(name = "idx_job_applied_date", columnList = "appliedDate")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    private String id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String company;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String role;

    private String location;

    private Integer salaryMin;

    private Integer salaryMax;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType jobType = JobType.FULL_TIME;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkMode workMode = WorkMode.ONSITE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ApplicationStatus status = ApplicationStatus.WISHLIST;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority = Priority.MEDIUM;

    private LocalDateTime appliedDate;

    private String jobUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "userId", nullable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", referencedColumnName = "clerkId", insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
