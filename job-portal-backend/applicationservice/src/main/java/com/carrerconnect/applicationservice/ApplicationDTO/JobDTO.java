package com.carrerconnect.applicationservice.ApplicationDTO;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class JobDTO {
    private Long id;
    @NotBlank(message = "Job title is required")
    @Size(max = 15, message = "Job title must be at most 15 characters")
    private String title;
    @NotBlank(message = "Company name is required")
    @Size(max = 15, message = "Company name must be at most 15 characters")
    private String companyName;
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
    
}

