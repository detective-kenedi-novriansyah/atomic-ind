<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PurseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Purse::factory(30)->create();
    }
}
