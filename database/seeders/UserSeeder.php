<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'user_name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123456'),
            ],
            [
                'user_name' => 'manager',
                'email' => 'manager@gmail.com',
                'password' => Hash::make('123456'),
            ],
        ];
        User::insert($rows);
    }
}
