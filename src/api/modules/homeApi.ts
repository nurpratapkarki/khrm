// ==================== homeApi.ts ====================

import { apiService } from "../apiService";
import type { HomePageData } from "../types";


export const homeApi = {
  getHomePageData: () => apiService.getReq<HomePageData>('/home/'),
};
