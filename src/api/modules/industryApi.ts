import { apiService } from "../apiService";
import type { Client, Industry, IndustryFilters, Testimonial } from "../types";


export const industryApi = {
  // Industries
  getIndustries: (filters?: IndustryFilters) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<Industry[]>(`/industries/${query}`);
  },
  getIndustry: (slug: string) => apiService.getReq<Industry>(`/industries/${slug}/`),
  getFeaturedIndustries: () => apiService.getReq<Industry[]>('/industries/featured/'),
  getIndustryJobs: (slug: string) => apiService.getReq<any[]>(`/industries/${slug}/jobs/`),
  getIndustryClients: (slug: string) => apiService.getReq<Client[]>(`/industries/${slug}/clients/`),

  // Clients
  getClients: (filters?: any) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<Client[]>(`/clients/${query}`);
  },
  getClient: (id: number) => apiService.getReq<Client>(`/clients/${id}/`),
  getFeaturedClients: () => apiService.getReq<Client[]>('/clients/featured/'),

  // Testimonials
  getTestimonials: (filters?: any) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<Testimonial[]>(`/testimonials/${query}`);
  },
  getTestimonial: (id: number) => apiService.getReq<Testimonial>(`/testimonials/${id}/`),
  getFeaturedTestimonials: () => apiService.getReq<Testimonial[]>('/testimonials/featured/'),
};