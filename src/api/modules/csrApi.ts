import { apiService } from '@/api/apiService';
import type { CSRProject, PaginatedResponse } from '@/api/types';

export const csrApi = {
  async getProjects(params?: { page?: number }) {
    const url =
      params && params.page !== undefined
        ? `/csr-projects/?page=${params.page}`
        : '/csr-projects/';
    return apiService.getReq<CSRProject[] | PaginatedResponse<CSRProject>>(url);
  },

  async getProject(slug: string) {
    return apiService.getReq<CSRProject>(`/csr-projects/${slug}/`);
  },
};

