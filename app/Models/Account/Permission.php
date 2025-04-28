<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use App\Parsers\Account\PermissionParser;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class Permission extends BaseModel
{
    //

    protected $guarded = ['id'];
    
    public $parser = PermissionParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }


    /* --- Scopes --- */

    public function scopeFilter($query, Request $request)
    {
        if ($this->hasSearch($request)) {
            $query->where(function ($query) use ($request) {
                $query->where('name', 'ILIKE', "%{$request->search}%")
                    ->orWhere('code', 'ILIKE', "%{$request->search}%");
            });
        }

        return $query;
    }


    /* --- Relationships --- */

    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(
            Role::class,
            'role_has_permissions',
            'permission_id',
            'role_id',
        );
    }


    /* --- Functions --- */

    public static function cache(?string $roleId = null)
    {
        if (empty($roleId)) {
            return [];
        }

        $key = "permission-{$roleId}";

        if (Cache::has($key)) {
            Cache::forget($key);
        }

        $permissionCodes = Permission::whereHas('roles', function ($query) use ($roleId) {
            $query->where('id', $roleId);
        })->pluck('code')->toArray();

        Cache::forever($key, $permissionCodes);

        return $permissionCodes;
    }

    public static function getForRole(?string $roleId = null)
    {
        if (empty($roleId)) {
            return [];
        }

        $key = "permission-{$roleId}";

        if (Cache::has($key)) {
            return Cache::get($key);
        }

        return static::cache($roleId);
    }
}
