<?php

namespace App\Jobs\Traits;

use App\Constants\Activity\ActivityAction;
use App\Models\Misc\ExportJob;

trait Exporter
{
    private function complete(string $model, bool $success)
    {
        /** @var ExportJob */
        $job = ExportJob::where('created_by', $this->requestor->id)
            ->where('model', $model)
            ->whereNull('completed_at')
            ->first();

        if (empty($job)) {
            error('Invalid export');
        }

        $job->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

        $job->update([
            'completed_at'  => now(),
            'success'       => $success
        ]);

        $readableModel = explode('\\', $model);
        $readableModel = $readableModel[count($readableModel) - 1];

        $job->setActivityPropertyAttributes(ActivityAction::UPDATE)
            ->setUser($this->requestor)
            ->saveActivity($success ? "Successfully exported {$readableModel} data" : "Failed to export {$readableModel} data");

    }
}