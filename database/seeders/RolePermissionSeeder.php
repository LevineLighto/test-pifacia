<?php

namespace Database\Seeders;

use App\Models\Account\Permission;
use App\Models\Account\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ['name' => 'All Users Permissions', 'code' => 'users.*', 'created_at' => now()],
            ['name' => 'Read Users', 'code' => 'users.read', 'created_at' => now()],
            ['name' => 'Create Users', 'code' => 'users.create', 'created_at' => now()],
            ['name' => 'Update Users', 'code' => 'users.update', 'created_at' => now()],
            ['name' => 'Delete Users', 'code' => 'users.delete', 'created_at' => now()],
            
            ['name' => 'All Roles Permissions', 'code' => 'roles.*', 'created_at' => now()],
            ['name' => 'Read Roles', 'code' => 'roles.read', 'created_at' => now()],
            ['name' => 'Create Roles', 'code' => 'roles.create', 'created_at' => now()],
            ['name' => 'Update Roles', 'code' => 'roles.update', 'created_at' => now()],
            ['name' => 'Delete Roles', 'code' => 'roles.delete', 'created_at' => now()],

            ['name' => 'Assign Permissions', 'code' => 'permissions.assign', 'created_at' => now()],
        ];
    }
}
