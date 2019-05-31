<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateRatingGuideAnswerExpectedAnswerColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rating_guide_answers', function (Blueprint $table) {
            $table->text('expected_answer')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rating_guide_answers', function (Blueprint $table) {
            $table->string('expected_answer')->nullable()->change();
        });
    }
}
