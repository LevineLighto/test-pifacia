<?php

namespace App\Models;

use App\Models\Account\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class BaseModel extends Model
{
    //
    use HasUuids, SoftDeletes;

    protected $guarded = ['id'];


    /* --- Relationships --- */

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater() : BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function deleter() : BelongsTo
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }


    /* --- Functions --- */

    public function hasSearch(Request $request)
    {
        return $request->has('search') && $request->filled('search');
    }
}
