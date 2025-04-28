<?php

namespace App\Parsers\Account;

use App\Parsers\BaseParser;

class RoleParser extends BaseParser
{
    public static function first($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        return [
            'id'            => $data->id,
            'name'          => $data->name,
            'code'          => $data->code,
            'is_active'     => $data->is_active,
            'editable'      => $data->editable,
            'permissions'   => PermissionParser::get($data->permissions),
            'created_at'    => format_date($data->created_at, true),
            'created_by'    => format_subject($data),
            'updated_at'    => format_date($data->updated_at, true),
            'updated_by'    => format_subject($data, 'updated_by'),
            'deleted_at'    => format_date($data->deleted_at, true),
            'deleted_by'    => format_subject($data, 'deleted_by'),
        ];
    }

    public static function get($collection) : array | null
    {
        return static::briefs($collection);
    }

    public static function brief($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        return [
            'id'        => $data->id,
            'name'      => $data->name,
            'code'      => $data->code,
            'is_active' => $data->is_active,
            'editable'  => $data->editable,
        ];
    }
}