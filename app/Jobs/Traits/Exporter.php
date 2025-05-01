<?php

namespace App\Jobs\Traits;

use App\Constants\Activity\ActivityAction;
use App\Models\Misc\ExportJob;
use Illuminate\Support\Facades\Log;

trait Exporter
{
    private function complete(string $model, bool $success)
    {
        /** @var ExportJob */
        $job = ExportJob::where('created_by', $this->requestor->id)
            ->where('model', $model)
            ->whereNull('completed_at')
            ->first();

        Log::debug($this->requestor);

        if (empty($job)) {
            error('Invalid export');
        }

        $job->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

        $job->update([
            'completed_at'  => now(),
            'success'       => $success
        ]);

        $job->setActivityPropertyAttributes(ActivityAction::UPDATE)
            ->saveActivity($success ? "Successfully exported {$model} data" : "Failed to export {$model} data");

    }
}