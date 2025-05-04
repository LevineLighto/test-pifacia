<?php

namespace App\Constants\Activity;

use App\Constants\BaseCodeConstant;

class ActivityType extends BaseCodeConstant
{
    const ACCOUNT   = 'account';
    const USER      = 'user';
    const ROLE      = 'role';
    const PERMISSION= 'permission';

    const HR        = 'hr';
    const DIVISION  = 'division';
    const POSITION  = 'position';
    const EMPLOYEE  = 'employee';

    const MISC      = 'misc';
    const EXPORT    = 'export';
    const IMPORT    = 'import';
}
