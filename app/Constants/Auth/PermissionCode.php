<?php

namespace App\Constants\Auth;

use App\Constants\BaseCodeConstant;

class PermissionCode extends BaseCodeConstant
{
    const USERS_ALL = 'users.*';
    const USERS_READ = 'users.read';
    const USERS_CREATE = 'users.create';
    const USERS_UPDATE = 'users.update';
    const USERS_DELETE = 'users.delete';

    const ROLES_ALL = 'roles.*';
    const ROLES_READ = 'roles.read';
    const ROLES_CREATE = 'roles.create';
    const ROLES_UPDATE = 'roles.update';
    const ROLES_DELETE = 'roles.delete';
    
    const PERMISSION_ASSIGN = 'permissions.assign';

    const DIVISIONS_ALL = 'divisions.*';
    const DIVISIONS_READ = 'divisions.read';
    const DIVISIONS_CREATE = 'divisions.create';
    const DIVISIONS_UPDATE = 'divisions.update';
    const DIVISIONS_DELETE = 'divisions.delete';

    const POSITIONS_ALL = 'positions.*';
    const POSITIONS_READ = 'positions.read';
    const POSITIONS_CREATE = 'positions.create';
    const POSITIONS_UPDATE = 'positions.update';
    const POSITIONS_DELETE = 'positions.delete';

    const EMPLOYEES_ALL = 'employees.*';
    const EMPLOYEES_READ = 'employees.read';
    const EMPLOYEES_CREATE = 'employees.create';
    const EMPLOYEES_UPDATE = 'employees.update';
    const EMPLOYEES_DELETE = 'employees.delete';
}
