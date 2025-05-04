<?php

namespace App\Models\Misc;

use App\Models\BaseModel;
use App\Models\Misc\Traits\HasImportJobActivity;
use App\Parsers\Misc\ImportJobParser;
use Illuminate\Http\Request;

class ImportJob extends BaseModel
{
    //
    use HasImportJobActivity;

    protected $guarded = ['id'];
    
    public $parser = ImportJobParser::class;


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'success'       => 'boolean',
            'completed_at'  => 'datetime',
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
                $query->where('model', 'ILIKE', "%{$request->search}%");
            });
        }

        return $query;
    }
}
