<?php

namespace App\Constants\Activity;

use App\Constants\BaseCodeConstant;

class ActivityAction extends BaseCodeConstant
{
    const CREATE = 'create';
    const UPDATE = 'update';
    const DELETE = 'delete';
    const EXPORT = 'export';

    const OPTION = [
        self::CREATE,
        self::UPDATE,
        self::DELETE,
        self::EXPORT,
    ];

}
