import { apiService } from '@/api/apiService';
import type { CSRProject, PaginatedResponse } from '@/api/types';

export const csrApi = {
  async getProjects(params?: { page?: number }) {
    return apiService.getReq<CSRProject[] | PaginatedResponse<CSRProject>>(
      '/csr-projects/',
      params ? { params } : undefined,
    );
  },

  async getProject(slug: string) {
    return apiService.getReq<CSRProject>(`/csr-projects/${slug}/`);
  },
};

