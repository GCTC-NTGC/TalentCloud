<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateApplicationReviewLookups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Populate ReviewStatuses
        DB::table('review_statuses')->insert([
            ['id' => 1, 'name' => 'not_reviewed'],
            ['id' => 2, 'name' => 'partially_reviewed'],
            ['id' => 3, 'name' => 'reviewed'],
        ]);

        // Populate ReviewDecisions
        DB::table('review_decisions')->insert([
            ['id' => 1, 'name' => 'undecided'],
            ['id' => 2, 'name' => 'clarification'],
            ['id' => 3, 'name' => 'screened_in'],
            ['id' => 4, 'name' => 'screened_out'],
            ['id' => 5, 'name' => 'fake'],
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('review_statuses')->whereIn('id', [1, 2, 3])->delete();
        DB::table('review_decisions')->whereIn('id', [1, 2, 3, 4, 5])->delete();
    }
}
