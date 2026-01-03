const PERMISSIONS = {
    // Platform Governance
    MANAGE_PLATFORM: 'manage_platform', // Global settings, pricing, feature flags
    VIEW_AUDIT_LOGS: 'view_audit_logs',

    // User Management
    MANAGE_USERS: 'manage_users', // Create, edit, suspend users
    VIEW_USERS: 'view_users', // Read-only view of user profiles

    // Commerce & Subscriptions
    MANAGE_PLANS: 'manage_plans', // Create/Edit subscription plans
    MANAGE_ORDERS: 'manage_orders', // Refunds, invoices
    VIEW_ORDERS: 'view_orders', // Read-only view of orders

    // Medical & Programs
    MANAGE_PROGRAMS: 'manage_programs', // Super Admin approval/rejection
    CREATE_PROGRAMS: 'create_programs', // Creator capability
    VIEW_PROGRAM_ANALYTICS: 'view_program_analytics',

    // Corporate
    MANAGE_TENANT: 'manage_tenant', // Manage own corporate tenant
    VIEW_TENANT_REPORTS: 'view_tenant_reports',

    // Customer
    MANAGE_OWN_PROFILE: 'manage_own_profile',
    MANAGE_OWN_SUBSCRIPTION: 'manage_own_subscription'
};

const ROLES = {
    SUPER_ADMIN: 'super_admin',
    ADMIN: 'admin',
    CORPORATE_ADMIN: 'corporate_admin',
    CONTENT_CREATOR: 'content_creator',
    CUSTOMER: 'customer'
};

const ROLE_PERMISSIONS = {
    [ROLES.SUPER_ADMIN]: [
        PERMISSIONS.MANAGE_PLATFORM,
        PERMISSIONS.VIEW_AUDIT_LOGS,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.MANAGE_PLANS,
        PERMISSIONS.MANAGE_ORDERS,
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.MANAGE_PROGRAMS,
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS
    ],
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS
        // Distinctly LACKS manage_platform, manage_plans, manage_orders (refunds)
    ],
    [ROLES.CONTENT_CREATOR]: [
        PERMISSIONS.CREATE_PROGRAMS,
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS,
        PERMISSIONS.MANAGE_OWN_PROFILE
    ],
    [ROLES.CORPORATE_ADMIN]: [
        PERMISSIONS.MANAGE_TENANT,
        PERMISSIONS.VIEW_TENANT_REPORTS,
        PERMISSIONS.MANAGE_OWN_PROFILE
    ],
    [ROLES.CUSTOMER]: [
        PERMISSIONS.MANAGE_OWN_PROFILE,
        PERMISSIONS.MANAGE_OWN_SUBSCRIPTION
    ]
};

module.exports = {
    PERMISSIONS,
    ROLES,
    ROLE_PERMISSIONS
};
