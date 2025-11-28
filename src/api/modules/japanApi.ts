import { apiService } from '@/api/apiService';
import type { JapanLandingPage } from '@/api/types';

export const japanApi = {
  async getJapanLanding() {
    return apiService.getReq<JapanLandingPage | Record<string, never>>(
      '/japan-landing/',
    );
  },
};

