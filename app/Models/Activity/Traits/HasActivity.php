<?php

namespace App\Models\Activity\Traits;

use App\Models\Account\User;
use App\Models\Activity\Activity;
use Illuminate\Support\Str;

trait HasActivity
{
    protected string $activity_action       = '';
    protected array  $activity_properties   = [
        'old'   => null,
        'new'   => null,
    ];
    protected ?User $user = null;

    abstract public function getActivityType(): string;
    abstract public function getActivitySubType(): string;

    public function getActivityProperties()
    {
        return $this->activity_properties;
    }

    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
    }

    public function setActivityPropertyAttributes(string $action)
    {
        $this->activity_action = $action;

        $this->activity_properties['new'] = $this->processProperties($action);
        return $this;
    }

    public function setOldActivityPropertyAttributes(string $action)
    {
        $this->activity_action = $action;

        $this->activity_properties['old'] = $this->processProperties($action);
        return $this;
    }

    public function saveActivity(string $description)
    {
        $url = !empty($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
        $user = auth_user();
        if (empty($user)) {
            $user = $this->user;
        }

        /** @var Activity */
        $activity = Activity::create([
            'type'              => $this->getActivityType(),
            'sub_type'          => $this->getActivitySubType(),
            'action'            => $this->activity_action,
            'description'       => $description,
            'url'               => $url,
            'properties'        => $this->activity_properties,
            'created_by'        => $user?->id,
            'created_by_name'   => $user?->name,
        ]);

        $activity->referable()->associate($this);
    }


    private function processProperties(string $action)
    {
        $method = 'getActivityProperty';
        $method .= str_replace('_', '', Str::title($action));

        return $this->$method();
    }
}