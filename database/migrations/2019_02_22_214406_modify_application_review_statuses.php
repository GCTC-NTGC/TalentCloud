<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyApplicationReviewStatuses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table( 'review_statuses')->where('name', 'not_reviewed')->update(['name' => 'screened_out']);
        DB::table( 'review_statuses')->where('name', 'partially_reviewed')->update(['name' => 'still_thinking']);
        DB::table( 'review_statuses')->where('name', 'reviewed')->update(['name' => 'still_in']);

        DB::table('review_statuses')->insert([
            ['id' => 4, 'name' => 'not_reviewed'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table( 'review_statuses')->where('name', 'not_reviewed')->delete();

        DB::table('review_statuses')->where('name', 'screened_out')->update(['name' => 'not_reviewed']);
        DB::table('review_statuses')->where('name', 'still_thinking')->update(['name' => 'partially_reviewed']);
        DB::table('review_statuses')->where('name', 'still_in')->update(['name' => 'reviewed']);
    }
}
