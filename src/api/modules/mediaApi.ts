import { apiService } from '../apiService';
import type { AlbumFilters, MediaAlbum, PaginatedResponse } from '../types';

export const mediaApi = {
  /**
   * Get list of media albums, optionally filtered by type or page.
   * Backend may return either a plain list or a paginated response.
   */
  getAlbums: (filters?: AlbumFilters) => {
    const query = filters ? apiService.buildQueryString(filters as Record<string, any>) : '';
    const url = query ? `/media-albums/?${query}` : '/media-albums/';
    return apiService.getReq<MediaAlbum[] | PaginatedResponse<MediaAlbum>>(url);
  },

  /** Get a single album with its photos by slug */
  getAlbum: (slug: string) =>
    apiService.getReq<MediaAlbum>(`/media-albums/${slug}/`),

  /** Get albums grouped by type: { office: MediaAlbum[], training: MediaAlbum[], ... } */
  getAlbumsByType: () =>
    apiService.getReq<Record<string, MediaAlbum[]>>('/media-albums/by_type/'),
};

