import { apiService } from '../apiService';
import type { PrivacyPolicy, TermsOfService } from '../types';

export const policyApi = {
  /** Get the active privacy policy. Backend returns a single object. */
  getPrivacyPolicy: () =>
    apiService.getReq<PrivacyPolicy | Record<string, never>>('/privacy-policy/'),

  /** Get the active terms of service. Backend returns a single object. */
  getTermsOfService: () =>
    apiService.getReq<TermsOfService | Record<string, never>>('/terms-of-service/'),
};

