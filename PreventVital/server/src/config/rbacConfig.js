const PERMISSIONS = {
    // Platform Governance
    MANAGE_PLATFORM: 'manage_platform', // Global settings, pricing, feature flags
    VIEW_AUDIT_LOGS: 'view_audit_logs',

    // User Management
    MANAGE_USERS: 'manage_users', // Create, edit, suspend users
    VIEW_USERS: 'view_users', // Read-only view of user profiles
    VIEW_HEALTH_DATA_AGGREGATED: 'view_health_data_aggregated', // Corp Admin specific
    VIEW_HEALTH_DATA_INDIVIDUAL: 'view_health_data_individual', // Medical/Admin specific (strict)

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
    MANAGE_OWN_SUBSCRIPTION: 'manage_own_subscription',
    VIEW_OWN_HEALTH_DATA: 'view_own_health_data'
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
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS,
        PERMISSIONS.VIEW_HEALTH_DATA_INDIVIDUAL, // Super Admin can see mostly everything if needed, but rarely used
        PERMISSIONS.VIEW_HEALTH_DATA_AGGREGATED
    ],
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_USERS,
        PERMISSIONS.VIEW_ORDERS,
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS,
        PERMISSIONS.VIEW_HEALTH_DATA_INDIVIDUAL // Support staff might need this context, handled carefully
        // Distinctly LACKS manage_platform, manage_plans, manage_orders (refunds)
    ],
    [ROLES.CONTENT_CREATOR]: [
        PERMISSIONS.CREATE_PROGRAMS,
        PERMISSIONS.VIEW_PROGRAM_ANALYTICS,
        PERMISSIONS.MANAGE_OWN_PROFILE
        // NO Access to health data
    ],
    [ROLES.CORPORATE_ADMIN]: [
        PERMISSIONS.MANAGE_TENANT,
        PERMISSIONS.VIEW_TENANT_REPORTS,
        PERMISSIONS.MANAGE_OWN_PROFILE,
        PERMISSIONS.VIEW_HEALTH_DATA_AGGREGATED // Explicitly allowed
        // NO Access to individual health data
    ],
    [ROLES.CUSTOMER]: [
        PERMISSIONS.MANAGE_OWN_PROFILE,
        PERMISSIONS.MANAGE_OWN_SUBSCRIPTION,
        PERMISSIONS.VIEW_OWN_HEALTH_DATA
    ]
};

const SUBSCRIPTION_LIMITS = {
    free: {
        maxDevices: 1,
        programsAccess: false,
        consultationsPerMonth: 0,
        exportData: false
    },
    silver: {
        maxDevices: 2,
        programsAccess: true,
        consultationsPerMonth: 1,
        exportData: true
    },
    gold: {
        maxDevices: 5,
        programsAccess: true,
        consultationsPerMonth: 4,
        exportData: true
    },
    platinum: {
        maxDevices: 10,
        programsAccess: true,
        consultationsPerMonth: 999,
        exportData: true
    }
};

module.exports = {
    PERMISSIONS,
    ROLES,
    ROLE_PERMISSIONS,
    SUBSCRIPTION_LIMITS
};
