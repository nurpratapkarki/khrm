import { apiService } from '../apiService';
import type { Document, PaginatedResponse } from '../types';

export interface DocumentFilters {
  document_type?: string;
  page?: number;
}

export interface DocumentDownloadResponse {
  file_url: string;
  filename: string;
  download_count: number;
}

export const documentApi = {
  /**
   * Get documents list, optionally filtered. Backend may return
   * either a plain list or a paginated response.
   */
  getDocuments: (filters?: DocumentFilters) => {
    const query = filters ? apiService.buildQueryString(filters as Record<string, any>) : '';
    const url = query ? `/documents/?${query}` : '/documents/';
    return apiService.getReq<Document[] | PaginatedResponse<Document>>(url);
  },

  /** Get documents grouped by type: { employer_form: Document[], ... } */
  getDocumentsByType: () =>
    apiService.getReq<Record<string, Document[]>>('/documents/by_type/'),

  /** Notify backend about a download and get a tracked download URL back */
  trackDownload: (id: number) =>
    apiService.postReq<DocumentDownloadResponse>(`/documents/${id}/download/`),
};

