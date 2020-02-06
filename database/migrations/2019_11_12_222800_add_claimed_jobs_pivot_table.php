<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddClaimedJobsPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('claimed_jobs', function (Blueprint $table) {
            $table->integer('hr_advisor_id')->unsigned()->nullable();
            $table->integer('job_poster_id')->unsigned()->nullable();
            $table->timestamps();
        });

        Schema::table('claimed_jobs', function (Blueprint $table) {
            $table->foreign('hr_advisor_id')->references('id')->
                on('hr_advisors');
            $table->foreign('job_poster_id')->references('id')->
                on('job_posters');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('claimed_jobs');
    }
}
