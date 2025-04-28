<?php

namespace App\Models\Account\Traits;

use App\Constants\Activity\ActivityType;
use App\Models\Activity\Traits\HasActivity;

trait HasUserActivity
{
    use HasActivity;

    public function getActivityType(): string
    {
        return ActivityType::ACCOUNT;
    }

    public function getActivitySubType(): string
    {
        return ActivityType::USER;
    }

    public function getActivityPropertyCreate()
    {
        return $this->getParser();
    }

    public function getActivityPropertyUpdate()
    {
        return $this->getParser();
    }

    public function getActivityPropertyDelete()
    {
        return $this->getParser();
    }


    /** --- FUNCTIONS --- */

    /**
     * @return array|null
     */
    private function getParser()
    {
        $this->refresh();

        return $this->parser::first($this);
    }
}