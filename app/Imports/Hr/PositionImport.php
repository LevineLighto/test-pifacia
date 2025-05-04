<?php

namespace App\Imports\Hr;

use App\Constants\Activity\ActivityAction;
use App\Models\Account\User;
use App\Models\Hr\Division;
use App\Models\Hr\Position;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class PositionImport implements ToCollection, WithHeadingRow, WithChunkReading
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
                $divisionName = $row[$this->headings['division']];
                if (empty($divisionName)) {
                    continue;
                }

                /** @var Division|null */
                $division = Division::where('name', 'ILIKE', $divisionName)->first();
                if (empty($division)) {
                    $division = $this->createDivision($divisionName);
                }

                $positionExists = Position::where('name', 'ILIKE', $row[$this->headings['name']])
                    ->where('division_id', $division->id)
                    ->exists();
                if ($positionExists) {
                    continue;
                }

                /** @var Position */
                $position = Position::create([
                    'name'              => $row[$this->headings['name']],
                    'code'              => $row[$this->headings['code']],
                    'is_active'         => parse_bool($row[$this->headings['is_active']]),
                    'scope'             => explode(',', $row[$this->headings['scope']]),
                    'division_id'       => $division->id,
                    'created_by'        => $this->user->id,
                    'created_by_name'   => $this->user->name,
                ]);

                $position->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->setUser($this->user)
                    ->saveActivity("Create new position: {$position->name} [{$position->id}] via import");
            }
            
            DB::commit();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
    
    public function chunkSize(): int
    {
        return 500;
    }


    private function createDivision($name) : Division
    {
        $exploded = explode(' ', $name);
        if (count($exploded) < 2) {
            $code = strtoupper(substr($name, 0, min(strlen($name), 2)));
        } else {
            $code = '';
            foreach ($exploded as $string) {
                $code .= strtoupper($string[0]);
            }
        }

        /** @var Division */
        $division = Division::create([
            'name'      => $name,
            'code'      => $code,
            'scope'     => [],
            'is_active' => true,
        ]);

        $division->setActivityPropertyAttributes(ActivityAction::CREATE)
            ->setUser($this->user)
            ->saveActivity("Create new division: {$division->name} [{$division->id}] via import");

        return $division;
    }
}
