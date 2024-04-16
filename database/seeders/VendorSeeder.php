<?php

namespace Database\Seeders;

use App\Models\AgencyOrVendor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'type' => 3,
                'name' => 'jivaben',
                'mobile_number' => '9854623512',
                'email' => 'jivaben@gmail.com',
                'balance' => 0,
            ],
            [
                'type' => 2,
                'name' => 'Ankit tea',
                'mobile_number' => '9856412356',
                'email' => 'ankittea@gmail.com',
                'balance' => 0,
            ],
        ];
        AgencyOrVendor::insert($rows);
    }
}
