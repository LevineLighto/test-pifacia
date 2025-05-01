<?php

namespace App\Jobs\Hr;

use App\Exports\Hr\PositionExcel;
use App\Jobs\Traits\Exporter;
use App\Mail\Misc\ExportMail;
use App\Models\Account\User;
use App\Models\Hr\Position;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class ExportPositionJob implements ShouldQueue
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
            
            Position::orderBy('id')->with(['division'])->chunk(500, function ($positions) use (&$properties) {

                foreach ($positions as $position) {
                    $properties[] = [
                        $position->name,
                        $position->code,
                        $position->is_active ? 'Yes' : 'No',
                        !empty($position->scope) ? implode(', ', $position->scope) : '',
                        $position->division->name,
                    ];
                }

            });

            $filename = 'exports/positions/' . $this->requestor->id . '-' . time() . '.xlsx';

            Excel::store(new PositionExcel($properties), $filename);

            Mail::to($this->requestor->email)
                ->send(new ExportMail("Position Export", $filename, $this->requestor));
            
            $this->complete(Position::class, true);
            
        } catch (\Throwable $th) {
            
            Log::error($th);
            $this->complete(Position::class, false);

        }
    }
}
