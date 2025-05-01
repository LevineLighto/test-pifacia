<?php

namespace App\Jobs\Hr;

use App\Exports\Hr\DivisionExcel;
use App\Jobs\Traits\Exporter;
use App\Mail\Misc\ExportMail;
use App\Models\Account\User;
use App\Models\Hr\Division;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class ExportDivisionJob implements ShouldQueue
{
    use Queueable, Exporter;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $requestor)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            
            $properties = [];
            
            Division::orderBy('id')->chunk(500, function ($divisions) use (&$properties) {

                foreach ($divisions as $division) {
                    $properties[] = [
                        $division->name,
                        $division->code,
                        $division->is_active ? 'Yes' : 'No',
                        !empty($division->scope) ? implode(', ', $division->scope) : '',
                    ];
                }

            });

            $filename = 'exports/divisions/' . $this->requestor->id . '-' . time() . '.xlsx';

            Excel::store(new DivisionExcel($properties), $filename);

            Mail::to($this->requestor->email)
                ->send(new ExportMail("Division Export", $filename, $this->requestor));
            
            $this->complete(Division::class, true);
            
        } catch (\Throwable $th) {
            
            Log::error($th);
            $this->complete(Division::class, false);

        }
    }
}
