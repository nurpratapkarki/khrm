import { apiService } from '@/api/apiService';
import type { JapanProgram, PaginatedResponse } from '@/api/types';

export const japanprogramApi = {
    async getJapanPrograms(): Promise<JapanProgram[]> {
        const response = await apiService.getReq<PaginatedResponse<JapanProgram>>(
            '/japan-programs/'
        );
        return response?.results || [];
    },

    async getJapanProgram(id: number): Promise<JapanProgram | null> {
        try {
            const response = await apiService.getReq<JapanProgram>(
                `/japan-programs/${id}/`
            );
            return response;
        } catch (error) {
            console.error('Failed to fetch program', error);
            return null;
        }
    },
};
