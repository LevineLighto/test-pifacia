<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use App\Parsers\Account\PermissionParser;
use Illuminate\Http\Request;

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
}
