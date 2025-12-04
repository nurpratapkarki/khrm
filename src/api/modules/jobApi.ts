import { apiService } from "../apiService";
import type { Job, JobApplication, JobCategory, JobFilters, PaginatedResponse } from "../types";

export const jobApi = {
  getJobs: (filters?: JobFilters) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<PaginatedResponse<Job>>(`/jobs/${query}`);
  },

  getJob: (slug: string) => 
    apiService.getReq<Job>(`/jobs/${slug}/`),

  getFeaturedJobs: () => 
    apiService.getReq<Job[]>('/jobs/featured/'),

  getJobCountries: () => 
    apiService.getReq<string[]>('/jobs/countries/'),

  getJobCategories: (filters?: any) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<JobCategory[]>(`/job-categories/${query}`);
  },

  applyForJob: (application: JobApplication) => {
    const formData = new FormData();
    
    // Add all text fields
    formData.append('job', application.job.toString());
    formData.append('first_name', application.first_name);
    formData.append('last_name', application.last_name);
    formData.append('email', application.email);
    formData.append('phone', application.phone);
    formData.append('date_of_birth', application.date_of_birth);
    formData.append('nationality', application.nationality);
    formData.append('current_location', application.current_location);
    formData.append('years_of_experience', application.years_of_experience.toString());
    
    // Add optional text fields
    if (application.previous_experience) {
      formData.append('previous_experience', application.previous_experience);
    }
    if (application.skills) {
      formData.append('skills', application.skills);
    }
    
    // Add file fields - only if they exist and are File objects
    if (application.resume instanceof File) {
      formData.append('resume', application.resume);
    }
    if (application.passport_copy instanceof File) {
      formData.append('passport_copy', application.passport_copy);
    }
    if (application.photo instanceof File) {
      formData.append('photo', application.photo);
    }

    return apiService.postReqMultipart<{ message: string; data: JobApplication }>(
      '/job-applications/',
      formData
    );
  },
};