import React from 'react';
import { hasPermission } from '../../utils/permissions';
import { useAuth } from '../../utils/AuthContext';

const PermissionGuard = ({ resource, action, children }) => {
  const { user } = useAuth();
  
  if (!user || !hasPermission(user.role, resource, action)) {
    return null;
  }

  return children;
};

export default PermissionGuard;