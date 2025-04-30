<?php

namespace App\Models\Hr;

use App\Models\BaseModel;
use App\Models\Hr\Traits\HasPositionActivity;
use App\Parsers\Hr\PositionParser;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Position extends BaseModel
{
    //
    use HasPositionActivity;

    protected $guarded = ['id'];
    
    public $parser = PositionParser::class;


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

        if (!empty($request->division_id)) {
            $query->where('division_id', $request->division_id);
        }

        if (!empty($request->sort_by)) {
            $direction = !empty($request->sort_dir) ? $request->sort_dir : 'ASC';
            $query->orderBy($request->sort_by, $direction);
        }

        return $query;
    }


    /* --- Relationships --- */

    public function division() : BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }

    public function employees() : HasMany
    {
        return $this->hasMany(Employee::class, 'position_id');
    }
}
