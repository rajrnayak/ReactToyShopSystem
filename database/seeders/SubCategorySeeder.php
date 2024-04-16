<?php

namespace Database\Seeders;

use App\Models\SubCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            [
                'name' => 'Office cleaning',
                'category_id' => '1',
            ],
            [
                'name' => 'Tea',
                'category_id' => '2',
            ],
            [
                'name' => 'Coffee',
                'category_id' => '2',
            ],
        ];
        SubCategory::insert($rows);
    }
}
