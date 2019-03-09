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
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->integer('review_status_id')->nullable()->unsigned()->change();
        });

        DB::table( 'review_statuses')->where('name', 'not_reviewed')->update(['name' => 'screened_out']);
        DB::table( 'review_statuses')->where('name', 'partially_reviewed')->update(['name' => 'still_thinking']);
        DB::table( 'review_statuses')->where('name', 'reviewed')->update(['name' => 'still_in']);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->integer('review_status_id')->unsigned()->change();
        });

        DB::table('review_statuses')->where('name', 'screened_out')->update(['name' => 'not_reviewed']);
        DB::table('review_statuses')->where('name', 'still_thinking')->update(['name' => 'partially_reviewed']);
        DB::table('review_statuses')->where('name', 'still_in')->update(['name' => 'reviewed']);
    }
}
