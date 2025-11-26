// ==================== companyApi.ts ====================

import { apiService } from "../apiService";
import type { Certification, CompanyInfo, Leadership, Office } from "../types";



export const companyApi = {
  // Offices
  getOffices: () => apiService.getReq<Office[]>('/offices/'),
  getOffice: (country: string) => apiService.getReq<Office>(`/offices/${country}/`),
  getHeadquarters: () => apiService.getReq<Office>('/offices/headquarters/'),

  // Company Info
  getCompanyInfo: () => apiService.getReq<CompanyInfo>('/company-info/'),

  // Leadership
  getLeadership: () => apiService.getReq<Leadership[]>('/leadership/'),
  getLeadershipMember: (id: number) => apiService.getReq<Leadership>(`/leadership/${id}/`),

  // Certifications
  getCertifications: () => apiService.getReq<Certification[]>('/certifications/'),
  getCertification: (id: number) => apiService.getReq<Certification>(`/certifications/${id}/`),
};
