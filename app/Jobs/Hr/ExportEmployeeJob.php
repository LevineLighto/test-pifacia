<?php

namespace App\Jobs\Hr;

use App\Exports\Hr\EmployeeExcel;
use App\Jobs\Traits\Exporter;
use App\Mail\Misc\ExportMail;
use App\Models\Account\User;
use App\Models\Hr\Employee;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class ExportEmployeeJob implements ShouldQueue
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
            
            Employee::orderBy('id')->with(['position', 'position.division'])->chunk(500, function ($employees) use (&$properties) {

                foreach ($employees as $employee) {
                    $properties[] = [
                        $employee->name,
                        $employee->email,
                        $employee->is_active ? 'Yes' : 'No',
                        !empty($employee->bpjs) ? $employee->bpjs['number'] : '',
                        format_date($employee->joined_at),
                        $employee->position->name,
                        $employee->position->division->name,
                    ];
                }

            });

            $filename = 'exports/employees/' . $this->requestor->id . '-' . time() . '.xlsx';

            Excel::store(new EmployeeExcel($properties), $filename);

            Mail::to($this->requestor->email)
                ->send(new ExportMail("Employee Export", $filename, $this->requestor));
            
            $this->complete(Employee::class, true);
            
        } catch (\Throwable $th) {
            
            Log::error($th);
            $this->complete(Employee::class, false);

        }
    }
}
