import axios from 'axios';
import { ProgramFilter, ProgramResponse, SingleProgramResponse } from '@/types/program';

// Base URL is handled by global axios config in main.tsx (via proxy or .env)

export const programService = {
    // Get all programs with optional filters
    getAllPrograms: async (filters: ProgramFilter = {}): Promise<ProgramResponse> => {
        const params = new URLSearchParams();

        if (filters.category && filters.category !== 'all') params.append('category', filters.category);
        if (filters.difficulty && filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
        if (filters.search) params.append('search', filters.search);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        const response = await axios.get<ProgramResponse>(`/api/programs`, { params });
        return response.data;
    },

    // Get single program by ID
    getProgram: async (id: string): Promise<SingleProgramResponse> => {
        const response = await axios.get<SingleProgramResponse>(`/api/programs/${id}`);
        return response.data;
    }
};
