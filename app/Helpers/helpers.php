<?php

use App\Models\Account\Permission;
use App\Models\Account\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

if (!function_exists('auth_user')) {
    function auth_user () : User | null {
        return Auth::user();
    }
}

if (!function_exists('parse_inertia_data')) {
    function parse_inertia_data (mixed $data) {
        if (is_array($data)) {
            return [
                ...$data,
                'error_message'     => session('error'),
                'success_message'   => session('success'),
            ];
        }

        return [
            'data' => $data,
            'error_message'     => session('error'),
            'success_message'   => session('success'),
        ];
    }
}

if (!function_exists('format_subject')) {
    function format_subject (mixed $data, string $column = 'created_by') {
        $column_name = "{$column}_name";
        if (empty($data->$column) || empty($data->$column_name)) {
            return null;
        }

        return [
            'id'    => $data->$column,
            'name'  => $data->$column_name,
        ];
    }
}

if (!function_exists('format_date')) {
    function format_date (Carbon|string|null $date, ?bool $withTime = false) {
        if (is_null($date)) {
            return null;
        }
        
        if (is_string($date)) {
            $date = new Carbon($date);
        }

        $format = 'd F Y';
        if ($withTime) {
            $format .= ' H:i';
        }

        return $date->format($format);
    }
}

if (!function_exists('format_raw_date')) {
    function format_raw_date (Carbon|string|null $date) {
        if (is_null($date)) {
            return null;
        }
        
        if (is_string($date)) {
            $date = new Carbon($date);
        }

        return $date->toISOString();
    }
}

if (!function_exists('parse_date')) {
    function parse_date(string $date) {
        return new Carbon($date);
    }
}

if (!function_exists('has_permissions')) {
    function has_permissions (string ...$permissions) : bool {
        $user = auth_user();
        if (empty($user)) {
            return false;
        }

        $grantedPermissions = Permission::getForRole($user->role_id);
        if (empty($grantedPermissions)) {
            return false;
        }

        // If requested permission is granted, it won't appear here
        $difference = array_diff($permissions, $grantedPermissions);

        // So, if there is a change in number, the user has at least
        // one requested permission
        return count($difference) != count($permissions);
    }
}