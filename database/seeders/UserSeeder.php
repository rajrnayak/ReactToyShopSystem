<?php

namespace Database\Seeders;

use App\Models\User;
use Faker\Factory;
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

        $faker = Factory::create();

        for ($count = 0; $count < 18; $count++) {

            $array = [
                'user_name' => $faker->name(),
                'email' => $faker->safeEmail(),
                'password' => Hash::make('123456'),
            ];

            $rows []= $array;

        }

        User::insert($rows);


    }
}
