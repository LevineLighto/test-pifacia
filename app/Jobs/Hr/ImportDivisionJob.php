<?php

namespace App\Jobs\Hr;

use App\Imports\Hr\DivisionImport;
use App\Jobs\Traits\Importer;
use App\Mail\Misc\ImportMail;
use App\Models\Account\User;
use App\Models\Hr\Division;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Maatwebsite\Excel\Facades\Excel;

class ImportDivisionJob implements ShouldQueue
{
    use Queueable, Importer;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $uploader,
                                public string $filename,
                                public array $headings)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            
            Excel::import(new DivisionImport($this->uploader, $this->headings), $this->filename);

            Mail::to($this->uploader->email)
                ->send(new ImportMail('Division Import', $this->uploader));

            $this->complete(Division::class, true);
            
        } catch (\Throwable $th) {

            Log::error($th);
            $this->complete(Division::class, false);
        }
    }
}
