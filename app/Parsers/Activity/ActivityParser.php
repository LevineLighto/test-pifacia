<?php

namespace App\Parsers\Activity;

use App\Constants\Activity\ActivityAction;
use App\Constants\Activity\ActivityType;
use App\Parsers\BaseParser;

class ActivityParser extends BaseParser
{
    public static function first($data) : array | null
    {
        if (empty($data)) {
            return null;
        }

        return [
            'id'            => $data->id,
            'type'          => ActivityType::display($data->type),
            'sub_type'      => ActivityType::display($data->sub_type),
            'action'        => ActivityAction::display($data->action),
            'description'   => $data->description,
            'url'           => $data->url,
            'properties'    => $data->properties,
            'created_at'    => format_date($data->created_at),
            'created_by'    => format_subject($data),
        ];
    }
}