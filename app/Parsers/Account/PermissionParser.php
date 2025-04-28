<?php

namespace App\Parsers\Account;

use App\Parsers\BaseParser;

class PermissionParser extends BaseParser
{
    public static function first($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        return [
            'id' => $data->id,
            'name' => $data->name,
            'code' => $data->code,
        ];
    }
}