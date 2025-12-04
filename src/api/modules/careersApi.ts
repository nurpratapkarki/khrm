import { apiService } from '@/api/apiService';
import type { Career, PaginatedResponse } from '@/api/types';

export interface CareerFilters {
  department?: string;
  location?: string;
  employment_type?: string;
  page?: number;
}

export const careersApi = {
  async getCareers(filters?: CareerFilters) {
    const queryString = filters
      ? '?' +
        Object.entries(filters)
          .filter(([_, v]) => v !== undefined && v !== null && v !== '')
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join('&')
      : '';
    return apiService.getReq<Career[] | PaginatedResponse<Career>>(
      `/careers/${queryString}`,
    );
  },

  async getCareer(slug: string) {
    return apiService.getReq<Career>(`/careers/${slug}/`);
  },
};

