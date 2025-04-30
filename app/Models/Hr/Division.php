<?php

namespace App\Models\Hr;

use App\Models\BaseModel;
use App\Models\Hr\Traits\HasDivisionActivity;
use App\Parsers\Hr\DivisionParser;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Division extends BaseModel
{
    //
    use HasDivisionActivity;

    protected $guarded = ['id'];
    
    public $parser = DivisionParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'is_active'  => 'boolean',
            'scope'      => 'array',
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

        if (isset($request->is_active)) {
            $query->where('is_active', $request->is_active);
        }

        if (!empty($request->sort_by)) {
            $direction = !empty($request->sort_dir) ? $request->sort_dir : 'ASC';
            $query->orderBy($request->sort_by, $direction);
        }

        return $query;
    }


    /* --- Relationships --- */

    public function positions() : HasMany
    {
        return $this->hasMany(Position::class, 'division_id');
    }
}
