<?php

namespace App\Models\Activity;

use App\Models\BaseModel;
use App\Parsers\Activity\ActivityParser;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Http\Request;

class Activity extends BaseModel
{

    protected $guarded = ['id'];
    
    public $parser = ActivityParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'properties' => 'array',
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
                $query->where('description', 'ILIKE', "%{$request->search}%")
                    ->orWhere('type', 'ILIKE', "%{$request->search}%")
                    ->orWhere('sub_type', 'ILIKE', "%{$request->search}%");
            });
        }

        if (!empty($request->from_date) && !empty($request->to_date)) {
            $from   = parse_date($request->from_date)->startOfDay();
            $to     = parse_date($request->to_date)->endOfDay();

            $query->whereBetween('created_at', [$from, $to]);
        }

        if (!empty($request->sort_by)) {
            $direction = !empty($request->sort_dir) ? $request->sort_dir : 'ASC';
            $query->orderBy($request->sort_by, $direction);
        }

        return $query;
    }


    /* --- Relationships --- */

    public function referable() : MorphTo
    {
        return $this->morphTo('referable', 'referenceType', 'reference');
    }
}
