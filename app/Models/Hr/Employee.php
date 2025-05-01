<?php

namespace App\Models\Hr;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Hr\Traits\HasEmployeeActivity;
use App\Parsers\Hr\EmployeeParser;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Employee extends BaseModel
{
    //
    use HasEmployeeActivity;

    protected $guarded = ['id'];
    
    public $parser = EmployeeParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'is_active'     => 'boolean',
            'bpjs'          => 'array',
            'joined_at'     => 'datetime',
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
                    ->orWhere('email', 'ILIKE', "%{$request->search}%");
            });
        }

        if (isset($request->is_active)) {
            $query->where('is_active', $request->is_active);
        }

        if (!empty($request->position_id)) {
            $query->where('position_id', $request->position_id);
        }

        if (!empty($request->joined_from) && !empty($request->joined_to)) {
            $from   = parse_date($request->joined_from)->startOfDay();
            $to     = parse_date($request->joined_to)->endOfDay();

            $query->whereBetween('joined_at', [$from, $to]);
        }

        if (!empty($request->sort_by)) {
            $direction = !empty($request->sort_dir) ? $request->sort_dir : 'ASC';
            $query->orderBy($request->sort_by, $direction);
        }

        return $query;
    }

    public function scopeOfEmail($query, string $email)
    {
        $query->where('email', $email);
        return $query;
    }


    /* --- Relationships --- */

    public function position() : BelongsTo
    {
        return $this->belongsTo(Position::class, 'position_id');
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
