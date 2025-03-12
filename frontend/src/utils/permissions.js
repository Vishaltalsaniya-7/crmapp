const ROLES = {
    ADMIN: 'admin',
    MANAGER: 'manager',
    USER: 'user'
  };
  
  const PERMISSIONS = {
    USERS: {
      VIEW: [ROLES.ADMIN, ROLES.MANAGER],
      CREATE: [ROLES.ADMIN],
      EDIT: [ROLES.ADMIN],
      DELETE: [ROLES.ADMIN]
    },
    CUSTOMERS: {
      VIEW: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      CREATE: [ROLES.ADMIN, ROLES.MANAGER],
      EDIT: [ROLES.ADMIN, ROLES.MANAGER],
      DELETE: [ROLES.ADMIN]
    },
    LEADS: {
      VIEW: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      CREATE: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      EDIT: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
      DELETE: [ROLES.ADMIN, ROLES.MANAGER]
    }
  };
  
  export const hasPermission = (userRole, resource, action) => {
    if (!PERMISSIONS[resource] || !PERMISSIONS[resource][action]) {
      return false;
    }
    return PERMISSIONS[resource][action].includes(userRole);
  };
  
  export { ROLES, PERMISSIONS };