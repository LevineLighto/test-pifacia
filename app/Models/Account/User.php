<?php

namespace App\Models\Account;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Models\Account\Traits\HasUserActivity;
use App\Parsers\Account\UserParser;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable; 
    use SoftDeletes, HasUuids, HasUserActivity;

    protected $guarded = ['id'];
    public $parser = UserParser::class;

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];


    /* --- Mutators, Accessors, & Cast --- */

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'created_at'        => 'datetime',
            'updated_at'        => 'datetime',
            'deleted_at'        => 'datetime',
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

        if (!empty($request->role_id)) {
            $query->where('role_id', $request->role_id);
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

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class, 'role_id');
    }


    /* --- Functions --- */

    public function hasSearch(Request $request)
    {
        return $request->has('search') && $request->filled('search');
    }
}
