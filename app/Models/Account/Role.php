<?php

namespace App\Models\Account;

use App\Models\Account\Traits\HasRoleActivity as TraitsHasRoleActivity;
use App\Models\BaseModel;
use App\Parsers\Account\RoleParser;
use HasRoleActivity;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Role extends BaseModel
{
    //
    use TraitsHasRoleActivity;

    protected $guarded = ['id'];
    
    public $parser = RoleParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'is_active'     => 'boolean',
            'editable'      => 'boolean',
            'created_at'    => 'datetime',
            'updated_at'    => 'datetime',
            'deleted_at'    => 'datetime',
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

        if (isset($request->is_active)) {
            $query->where('is_active', $request->is_active);
        }

        if (!empty($request->sort_by)) {
            $direction = !empty($request->sort_dir) ? $request->sort_dir : 'ASC';
            $query->orderBy($request->sort_by, $direction);
        }

        return $query;
    }

    public function scopeOfCode($query, string $code)
    {
        $query->where('code', $code);
        return $query;
    }


    /* --- Relationships --- */

    public function users() : HasMany
    {
        return $this->hasMany(User::class, 'role_id');
    }

    public function permissions() : BelongsToMany
    {
        return $this->belongsToMany(
            Permission::class, 
            'role_has_permissions',
            'role_id',
            'permission_id',
        );
    }
}
