import { apiService } from '../apiService';
import type { EmployerInquiry } from '../types';

export const employerApi = {
  /** Submit a new employer manpower request (Request Manpower form). */
  submitInquiry: (data: EmployerInquiry) => {
    const formData = apiService.createFormData(data as Record<string, any>);
    return apiService.postReqMultipart<EmployerInquiry>('/employer-inquiries/', formData);
  },
};

