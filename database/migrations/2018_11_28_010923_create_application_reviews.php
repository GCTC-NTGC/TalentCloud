<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApplicationReviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('application_reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('job_application_id')->unsigned();
            $table->integer('review_status_id')->unsigned();
            $table->integer('review_decision_id')->unsigned();
            $table->string('reviewer')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        Schema::create('review_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('review_decisions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('application_reviews', function (Blueprint $table) {
            $table->foreign('job_application_id')->references('id')->
                on('job_applications')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('review_status_id')->references('id')->
                on('review_statuses')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->foreign('review_decision_id')->references('id')->
                on('review_decisions')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('application_reviews');
        Schema::dropIfExists('review_statuses');
        Schema::dropIfExists('review_decisions');
    }
}
