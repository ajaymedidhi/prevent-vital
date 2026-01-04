export interface User {
    id: string;
    name?: string;
    email: string;
    role: 'super_admin' | 'admin' | 'corporate_admin' | 'content_creator' | 'customer';
    customerType?: 'individual' | 'corporate';
    tenantId?: string;
    corporateId?: string;
    profile?: {
        firstName?: string;
        lastName?: string;
    };
    corporateProfile?: {
        department?: string;
        employeeId?: string;
        designation?: string;
    };
    privacySettings?: {
        dataSharing: boolean;
        marketingEmails: boolean;
        twoFactorEnabled: boolean;
    };
    isVerified: boolean;
    status: 'active' | 'suspended';
    permissions: string[];
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}
