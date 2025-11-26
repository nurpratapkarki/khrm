import { apiService } from '../apiService';
import type { TrainingCourse, TrainingFacility } from '../types';


export const trainingApi = {
  getCourses: (filters?: Record<string, any>) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<TrainingCourse[]>(`/training-courses/${query}`);
  },

  getCourse: (slug: string) =>
    apiService.getReq<TrainingCourse>(`/training-courses/${slug}/`),

  getCoursesByType: () =>
    apiService.getReq<Record<string, TrainingCourse[]>>('/training-courses/by_type/'),

  getFacilities: () =>
    apiService.getReq<TrainingFacility[]>('/training-facilities/'),
};

