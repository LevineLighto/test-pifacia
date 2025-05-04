<?php

namespace App\Imports\Hr;

use App\Constants\Activity\ActivityAction;
use App\Models\Account\User;
use App\Models\Hr\Division;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class DivisionImport implements ToCollection, WithHeadingRow, WithChunkReading
{
    public function __construct(private User $user,
                                private array $headings)
    {
        
    }

    public function collection(Collection $collection)
    {
        DB::beginTransaction();
        try {

            foreach ($collection as $row) {
                /** @var Division */
                $division = Division::create([
                    'name'              => $row[$this->headings['name']],
                    'code'              => $row[$this->headings['code']],
                    'is_active'         => parse_bool($row[$this->headings['is_active']]),
                    'scope'             => explode(',', $row[$this->headings['scope']]),
                    'created_by'        => $this->user->id,
                    'created_by_name'   => $this->user->name,
                ]);

                $division->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->setUser($this->user)
                    ->saveActivity("Create new division: {$division->name} [{$division->id}] via import");
            }
            
            DB::commit();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
    
    public function chunkSize(): int
    {
        return 1000;
    }
}
