export interface User {
    id: string;
    name?: string;
    email: string;
    role: 'super_admin' | 'admin' | 'corporate_admin' | 'content_creator' | 'customer';
    tenantId?: string;
    isVerified: boolean;
    status: 'active' | 'suspended';
    permissions: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
