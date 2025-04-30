export const USERS_ALL = 'users.*'
export const USERS_READ = 'users.read'
export const USERS_CREATE = 'users.create'
export const USERS_UPDATE = 'users.update'
export const USERS_DELETE = 'users.delete'

export const USERS_GROUP_READ = [ USERS_ALL, USERS_READ ]
export const USERS_GROUP_CREATE = [ USERS_ALL, USERS_CREATE ]
export const USERS_GROUP_UPDATE = [ USERS_ALL, USERS_UPDATE ]
export const USERS_GROUP_DELETE = [ USERS_ALL, USERS_DELETE ]

export const ROLES_ALL = 'roles.*'
export const ROLES_READ = 'roles.read'
export const ROLES_CREATE = 'roles.create'
export const ROLES_UPDATE = 'roles.update'
export const ROLES_DELETE = 'roles.delete'

export const ROLES_GROUP_READ = [ ROLES_ALL, ROLES_READ ]
export const ROLES_GROUP_CREATE = [ ROLES_ALL, ROLES_CREATE ]
export const ROLES_GROUP_UPDATE = [ ROLES_ALL, ROLES_UPDATE ]
export const ROLES_GROUP_DELETE = [ ROLES_ALL, ROLES_DELETE ]

export const PERMISSION_ASSIGN = 'permissions.assign'

export const DIVISIONS_ALL = 'divisions.*'
export const DIVISIONS_READ = 'divisions.read'
export const DIVISIONS_CREATE = 'divisions.create'
export const DIVISIONS_UPDATE = 'divisions.update'
export const DIVISIONS_DELETE = 'divisions.delete'

export const DIVISIONS_GROUP_READ = [ DIVISIONS_ALL, DIVISIONS_READ ]
export const DIVISIONS_GROUP_CREATE = [ DIVISIONS_ALL, DIVISIONS_CREATE ]
export const DIVISIONS_GROUP_UPDATE = [ DIVISIONS_ALL, DIVISIONS_UPDATE ]
export const DIVISIONS_GROUP_DELETE = [ DIVISIONS_ALL, DIVISIONS_DELETE ]

export const POSITIONS_ALL = 'positions.*'
export const POSITIONS_READ = 'positions.read'
export const POSITIONS_CREATE = 'positions.create'
export const POSITIONS_UPDATE = 'positions.update'
export const POSITIONS_DELETE = 'positions.delete'

export const POSITIONS_GROUP_READ = [ POSITIONS_ALL, POSITIONS_READ ]
export const POSITIONS_GROUP_CREATE = [ POSITIONS_ALL, POSITIONS_CREATE ]
export const POSITIONS_GROUP_UPDATE = [ POSITIONS_ALL, POSITIONS_UPDATE ]
export const POSITIONS_GROUP_DELETE = [ POSITIONS_ALL, POSITIONS_DELETE ]

export const EMPLOYEES_ALL = 'employees.*'
export const EMPLOYEES_READ = 'employees.read'
export const EMPLOYEES_CREATE = 'employees.create'
export const EMPLOYEES_UPDATE = 'employees.update'
export const EMPLOYEES_DELETE = 'employees.delete'

export const EMPLOYEES_GROUP_READ = [ EMPLOYEES_ALL, EMPLOYEES_READ ]
export const EMPLOYEES_GROUP_CREATE = [ EMPLOYEES_ALL, EMPLOYEES_CREATE ]
export const EMPLOYEES_GROUP_UPDATE = [ EMPLOYEES_ALL, EMPLOYEES_UPDATE ]
export const EMPLOYEES_GROUP_DELETE = [ EMPLOYEES_ALL, EMPLOYEES_DELETE ]

export const ACTIVITY_READ = 'activity.read'