<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropApplicationReviewDecisionAndReviewColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->dropColumn('reviewer');
            $table->dropColumn( 'review_decision_id');
        });

        Schema::dropIfExists( 'review_decisions');


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('application_reviews', function (Blueprint $table) {
            $table->integer('review_decision_id')->unsigned();
            $table->string('reviewer')->nullable();
        });

        Schema::create('review_decisions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('application_reviews', function (Blueprint $table) {
            $table->foreign('review_decision_id')->references('id')->on('review_decisions')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }
}
