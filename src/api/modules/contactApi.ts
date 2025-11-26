import { apiService } from '../apiService';
import type { ContactMessage, FAQ } from '../types';


export const contactApi = {
  getFAQs: (filters?: any) => {
    const query = filters ? `?${apiService.buildQueryString(filters)}` : '';
    return apiService.getReq<FAQ[]>(`/faqs/${query}`);
  },
  getFAQsByCategory: () => apiService.getReq<Record<string, FAQ[]>>('/faqs/by_category/'),
  sendContactMessage: (message: ContactMessage) => 
    apiService.postReq<{ message: string; data: ContactMessage }>('/contact-messages/', message),
};