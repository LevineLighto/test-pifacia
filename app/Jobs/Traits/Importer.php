<?php

namespace App\Jobs\Traits;

use App\Constants\Activity\ActivityAction;
use App\Models\Misc\ImportJob;

trait Importer
{
    private function complete(string $model, bool $success)
    {
        /** @var ImportJob */
        $job = ImportJob::where('created_by', $this->uploader->id)
            ->where('model', $model)
            ->whereNull('completed_at')
            ->first();

        if (empty($job)) {
            error('Invalid import');
        }

        $job->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

        $job->update([
            'completed_at'  => now(),
            'success'       => $success
        ]);

        $job->setActivityPropertyAttributes(ActivityAction::UPDATE)
            ->saveActivity($success ? "Successfully imported {$model} data" : "Failed to import {$model} data");

    }
}