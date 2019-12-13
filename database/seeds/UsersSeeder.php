<?php

use Illuminate\Database\Seeder;
use App\Models\Manager;
use App\Models\Applicant;
use App\Models\HrAdvisor;

class UsersSeeder extends Seeder
{

    /**
     * Run the Users table seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Manager::class, 10)->create();
        factory(Applicant::class, 5)->create();
        factory(HrAdvisor::class, 1)->create();
    }
}
