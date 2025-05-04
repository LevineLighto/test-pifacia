<?php

namespace App\Imports\Hr;

use App\Constants\Activity\ActivityAction;
use App\Models\Account\Role;
use App\Models\Account\User;
use App\Models\Hr\Division;
use App\Models\Hr\Employee;
use App\Models\Hr\Position;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class EmployeeImport implements ToCollection, WithHeadingRow, WithChunkReading
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
                $email = strtolower($row[$this->headings['email']]);
                if (empty($email)) {
                    continue;
                }

                $password = $row[$this->headings['password']];
                if (empty($password)) {
                    continue;
                }

                if (Employee::where('email', $email)->exists()) {
                    continue;
                }

                $divisionName = $row[$this->headings['division']];
                if (empty($divisionName)) {
                    continue;
                }

                /** @var Division|null */
                $division = Division::where('name', 'ILIKE', $divisionName)->first();
                if (empty($division)) {
                    $division = $this->createDivision($divisionName);
                }

                $positionName = $row[$this->headings['position']];
                if (empty($positionName)) {
                    continue;
                }

                /** @var Position|null */
                $position = Position::where('division_id', $division->id)
                    ->where('name', 'ILIKE', $positionName)
                    ->first();
                if (empty($position)) {
                    $position = $this->createPosition($positionName, $division);
                }

                $name   = $row[$this->headings['name']];

                /** @var User */
                $user = User::create([
                    'name'              => $name,
                    'email'             => $email,
                    'password'          => Hash::make($password),
                    'role_id'           => Role::ofCode('U')->first()->id,
                    'created_by'        => $this->user->id,
                    'created_by_name'   => $this->user->name,
                ]);

                $date = $row[$this->headings['joined_at']];
                if (!empty($date)) {
                    $date = Carbon::instance(Date::excelToDateTimeObject($date));
                }


                /** @var Employee */
                $employee = Employee::create([
                    'name'              => $name,
                    'email'             => $email,
                    'is_active'         => parse_bool($row[$this->headings['is_active']]),
                    'joined_at'         => $date,
                    'position_id'       => $position->id,
                    'user_id'           => $user->id,
                    'created_by'        => $this->user->id,
                    'created_by_name'   => $this->user->name,
                ]);

                $user->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->setUser($this->user)
                    ->saveActivity("Create new user [{$user->id}] for employee {$employee->name} [{$employee->id}] via import");

                $employee->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->setUser($this->user)
                    ->saveActivity("Create new employee: {$employee->name} [{$employee->id}] via import");
            }
            
            DB::commit();

        } catch (\Throwable $th) {
            
            DB::rollBack();
            throw $th;

        }
    }
    
    public function chunkSize(): int
    {
        return 250;
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

    private function createPosition($name, Division $division) : Position
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

        /** @var Position */
        $position = Position::create([
            'name'          => $name,
            'code'          => $code,
            'scope'         => [],
            'is_active'     => true,
            'division_id'   => $division->id,
        ]);

        $position->setActivityPropertyAttributes(ActivityAction::CREATE)
            ->setUser($this->user)
            ->saveActivity("Create new position: {$position->name} [{$position->id}] via import");

        return $position;
    }
}
