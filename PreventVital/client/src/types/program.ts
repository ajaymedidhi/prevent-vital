export interface Program {
    _id: string;
    title: string;
    description: string;
    image: string;
    category: 'metabolic' | 'cardiovascular' | 'respiratory' | 'mental' | 'musculoskeletal' | 'preventive';
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    durationWeeks: number;
    totalSessions: number;
    averageRating: number;
    reviewCount: number;
    enrollmentCount: number;
    pricingType: 'free' | 'subscription' | 'one-time';
    creator: {
        _id: string;
        name: string;
        photo?: string;
        bio?: string;
        qualification?: string;
    };
    modules?: {
        title: string;
        content: string;
        videoUrl?: string;
        duration: number;
    }[];
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
}

export interface ProgramFilter {
    category?: string;
    difficulty?: string;
    minRating?: number;
    maxDuration?: number;
    search?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface ProgramResponse {
    status: string;
    results: number;
    data: {
        programs: Program[];
    };
}

export interface SingleProgramResponse {
    status: string;
    data: {
        program: Program;
    };
}
