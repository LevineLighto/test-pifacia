<?php

namespace App\Models\Hr\Traits;

use App\Constants\Activity\ActivityType;
use App\Models\Activity\Traits\HasActivity;

trait HasDivisionActivity
{
    use HasActivity;

    public function getActivityType(): string
    {
        return ActivityType::HR;
    }

    public function getActivitySubType(): string
    {
        return ActivityType::DIVISION;
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
        return array_merge(
            $this->getParser(),
            [ 'deleted_at' => format_date($this->deleted_at, true) ]
        );
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
