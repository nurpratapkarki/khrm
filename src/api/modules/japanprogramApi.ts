import { apiService } from '@/api/apiService';
import type { JapanProgramType } from '@/api/types';

export const japanprogramApi = {
    async getJapanPrograms(): Promise<JapanProgramType[]> {
        const response = await apiService.getReq<JapanProgramType[]>(
            '/japan-program/'
        );
        return response || [];
    },

    async getJapanProgram(id: number): Promise<JapanProgramType | null> {
        try {
            const response = await apiService.getReq<JapanProgramType>(
                `/japan-programs/${id}/`
            );
            return response;
        } catch (error) {
            console.error('Failed to fetch program', error);
            return null;
        }
    },
};
