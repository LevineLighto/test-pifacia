<?php

namespace Database\Seeders;

use App\Models\Account\Role;
use App\Models\Account\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count()) {
            return;
        }

        $data = $this->getData();

        User::create($data);
    }


    private function getData() : array
    {
        return [
            'name'      => 'Administrator',
            'email'     => 'admin@example.com',
            'password'  => Hash::make('Pifacia2025@#'),
            'role_id'   => Role::ofCode('SU')->first()->id,
        ];
    }
}
