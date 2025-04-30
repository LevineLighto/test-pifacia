import { Activity, Briefcase, Columns, Home, Shield, User, Users } from "react-feather";
import { SidebarItemType } from "./types";
import { ACTIVITY_READ, DIVISIONS_ALL, DIVISIONS_CREATE, DIVISIONS_DELETE, DIVISIONS_READ, DIVISIONS_UPDATE, EMPLOYEES_ALL, EMPLOYEES_CREATE, EMPLOYEES_DELETE, EMPLOYEES_READ, EMPLOYEES_UPDATE, PERMISSION_ASSIGN, POSITIONS_ALL, POSITIONS_CREATE, POSITIONS_DELETE, POSITIONS_READ, POSITIONS_UPDATE, ROLES_ALL, ROLES_CREATE, ROLES_DELETE, ROLES_READ, ROLES_UPDATE, USERS_ALL, USERS_CREATE, USERS_DELETE, USERS_READ, USERS_UPDATE } from "@/constants/permissions";

export const SidebarItems : SidebarItemType[][] = [
    [
        { 
            label: 'Dashboard',
            route: 'app.dashboard.index',
            icon : Home,
        }
    ],
    [
        { 
            label: 'Users',
            route: 'app.users.index',
            icon : User,
            permissions: [ USERS_ALL, USERS_CREATE, USERS_DELETE, USERS_READ, USERS_UPDATE ],
        },
        { 
            label: 'Roles',
            route: 'app.roles.index',
            icon : Shield,
            permissions: [ ROLES_ALL, ROLES_CREATE, ROLES_DELETE, ROLES_READ, ROLES_UPDATE, PERMISSION_ASSIGN ],
        },
    ],
    [
        { 
            label: 'Employees',
            route: 'app.employees.index',
            icon : Users,
            permissions: [ EMPLOYEES_ALL, EMPLOYEES_CREATE, EMPLOYEES_DELETE, EMPLOYEES_READ, EMPLOYEES_UPDATE ],
        },
        { 
            label: 'Positions',
            route: 'app.positions.index',
            icon : Briefcase,
            permissions: [ POSITIONS_ALL, POSITIONS_CREATE, POSITIONS_DELETE, POSITIONS_READ, POSITIONS_UPDATE ],
        },
        { 
            label: 'Divisions',
            route: 'app.divisions.index',
            icon : Columns,
            permissions: [ DIVISIONS_ALL, DIVISIONS_CREATE, DIVISIONS_DELETE, DIVISIONS_READ, DIVISIONS_UPDATE ],
        },
    ],
    [
        {
            label: 'Activities',
            route: 'app.activities.index',
            icon : Activity,
            permissions: [ ACTIVITY_READ ],
        }
    ]
];