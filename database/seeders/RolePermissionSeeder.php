<?php

namespace Database\Seeders;

use App\Constants\Auth\PermissionCode;
use App\Models\Account\Permission;
use App\Models\Account\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (Role::count()) {
            return;
        }

        $roleData = $this->getRoles();
        $administrator = null;
        foreach ($roleData as $role) {
            $created = Role::create($role);
            if ($role['code'] == 'SU') {
                $administrator = $created;
            }
        }
        
        $permissionData = $this->getPermissions();
        $permissions    = [];
        foreach ($permissionData as $permission) {
            $permissions[] = Permission::create($permission);
        }

        $insertData = [];
        foreach ($permissions as $permission) {
            $insertData[] = [
                'role_id'       => $administrator->id,
                'permission_id' => $permission->id,
            ];
        }

        DB::table('role_has_permissions')
            ->insert($insertData);
    }


    private function getRoles() : array
    {
        return [
            [
                'name' => 'Administrator', 
                'code' => 'SU', 
                'is_active' => true, 
                'editable' => false,
                'created_at' => now(),
            ],
            [
                'name' => 'User', 
                'code' => 'U', 
                'is_active' => true, 
                'editable' => false,
                'created_at' => now(),
            ],
        ];
    }

    private function getPermissions() : array
    {
        return [
            ['name' => 'All Users Permissions', 'code' => PermissionCode::USERS_ALL, 'created_at' => now()],
            ['name' => 'Read Users', 'code' => PermissionCode::USERS_READ, 'created_at' => now()],
            ['name' => 'Create Users', 'code' => PermissionCode::USERS_CREATE, 'created_at' => now()],
            ['name' => 'Update Users', 'code' => PermissionCode::USERS_UPDATE, 'created_at' => now()],
            ['name' => 'Delete Users', 'code' => PermissionCode::USERS_DELETE, 'created_at' => now()],
            
            ['name' => 'All Roles Permissions', 'code' => PermissionCode::ROLES_ALL, 'created_at' => now()],
            ['name' => 'Read Roles', 'code' => PermissionCode::ROLES_READ, 'created_at' => now()],
            ['name' => 'Create Roles', 'code' => PermissionCode::ROLES_CREATE, 'created_at' => now()],
            ['name' => 'Update Roles', 'code' => PermissionCode::ROLES_UPDATE, 'created_at' => now()],
            ['name' => 'Delete Roles', 'code' => PermissionCode::ROLES_DELETE, 'created_at' => now()],
            
            ['name' => 'Assign Permissions', 'code' => PermissionCode::PERMISSION_ASSIGN, 'created_at' => now()],
            
            ['name' => 'All Divisions Permissions', 'code' => PermissionCode::DIVISIONS_ALL, 'created_at' => now()],
            ['name' => 'Read Divisions', 'code' => PermissionCode::DIVISIONS_READ, 'created_at' => now()],
            ['name' => 'Create Divisions', 'code' => PermissionCode::DIVISIONS_CREATE, 'created_at' => now()],
            ['name' => 'Update Divisions', 'code' => PermissionCode::DIVISIONS_UPDATE, 'created_at' => now()],
            ['name' => 'Delete Divisions', 'code' => PermissionCode::DIVISIONS_DELETE, 'created_at' => now()],
            
            ['name' => 'All Positions Permissions', 'code' => PermissionCode::POSITIONS_ALL, 'created_at' => now()],
            ['name' => 'Read Positions', 'code' => PermissionCode::POSITIONS_READ, 'created_at' => now()],
            ['name' => 'Create Positions', 'code' => PermissionCode::POSITIONS_CREATE, 'created_at' => now()],
            ['name' => 'Update Positions', 'code' => PermissionCode::POSITIONS_UPDATE, 'created_at' => now()],
            ['name' => 'Delete Positions', 'code' => PermissionCode::POSITIONS_DELETE, 'created_at' => now()],
            
            ['name' => 'All Employees Permissions', 'code' => PermissionCode::EMPLOYEES_ALL, 'created_at' => now()],
            ['name' => 'Read Employees', 'code' => PermissionCode::EMPLOYEES_READ, 'created_at' => now()],
            ['name' => 'Create Employees', 'code' => PermissionCode::EMPLOYEES_CREATE, 'created_at' => now()],
            ['name' => 'Update Employees', 'code' => PermissionCode::EMPLOYEES_UPDATE, 'created_at' => now()],
            ['name' => 'Delete Employees', 'code' => PermissionCode::EMPLOYEES_DELETE, 'created_at' => now()],
        ];
    }
}
