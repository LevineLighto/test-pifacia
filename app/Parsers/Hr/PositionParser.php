<?php

namespace App\Parsers\Hr;

use App\Parsers\BaseParser;

class PositionParser extends BaseParser
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
            'scope'         => $data->scope,
            'division'      => DivisionParser::brief($data->division),
            'employees'     => EmployeeParser::briefs($data->employees),
            'created_at'    => format_date($data->created_at, true),
            'created_by'    => format_subject($data),
            'updated_at'    => format_date($data->updated_at, true),
            'updated_by'    => format_subject($data, 'updated_by'),
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
            'id'            => $data->id,
            'name'          => $data->name,
            'code'          => $data->code,
            'is_active'     => $data->is_active,
        ];
    }
}