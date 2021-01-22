<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class PopulateJobApplicationSteps extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('job_application_steps')->insert([
            ['name' => 'basic'],
            ['name' => 'experience'],
            ['name' => 'skills'],
            ['name' => 'fit'],
            ['name' => 'review'],
            ['name' => 'submission'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('job_application_steps')->whereIn('name', ['basic', 'experience', 'skills', 'fit', 'review', 'submission'])->delete();
    }
}
