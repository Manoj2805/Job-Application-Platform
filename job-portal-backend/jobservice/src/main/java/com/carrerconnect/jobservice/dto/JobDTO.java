package com.carrerconnect.jobservice.dto;



import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {

    private Long id;
    
    @NotBlank(message = "Job title is required")
    @Size(max = 100, message = "Job title must be at most 100 characters")
    private String title;
    
    @NotBlank(message = "company Name is required")
    private String companyName;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotBlank(message = "Job type is required")
    private String jobType;
    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description must be at most 500 characters")
    private String description;
    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be positive")
    private Double salary;
    @NotNull(message = "User ID is required")
    private Long userId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getJobType() {
		return jobType;
	}
	public void setJobType(String jobType) {
		this.jobType = jobType;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Double getSalary() {
		return salary;
	}
	public void setSalary(Double salary) {
		this.salary = salary;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
    
}
