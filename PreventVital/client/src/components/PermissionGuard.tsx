import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PermissionGuardProps {
    permission: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({ permission, children, fallback = null }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user || !user.permissions?.includes(permission)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

export default PermissionGuard;
