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
    const formData = apiService.createFormData(application);
    return apiService.postReqMultipart<{ message: string; data: JobApplication }>(
      '/job-applications/',
      formData
    );
  },
};