<?php

namespace App\Parsers\Hr;

use App\Parsers\BaseParser;

class EmployeeParser extends BaseParser
{
    public static function first($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        return [
            'id'            => $data->id,
            'name'          => $data->name,
            'email'         => $data->email,
            'is_active'     => $data->is_active,
            'bpjs'          => $data->bpjs,
            'bpjs_file'     => $data->bpjs_file,
            'position'      => PositionParser::brief($data->position),
            'division'      => DivisionParser::brief($data->position->division),
            'joined_at'     => format_date($data->joined_at),
            'raw_joined_at' => format_raw_date($data->joined_at),
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
            'email'         => $data->email,
            'is_active'     => $data->is_active,
            'position'      => PositionParser::brief($data->position),
            'joined_at'     => format_date($data->joined_at),
        ];
    }
}