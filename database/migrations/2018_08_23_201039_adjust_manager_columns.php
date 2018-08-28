<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AdjustManagerColumns extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->integer('years_experience')->unsigned()->nullable();
        });

        Schema::table('manager_translations', function (Blueprint $table) {
            $table->dropColumn('work_experience');

            $table->text('career_journey')->nullable();
            $table->text('learning_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->dropColumn('years_experience');
        });

        Schema::table('manager_translations', function (Blueprint $table) {
            $table->text('work_experience')->nullable();

            $table->dropColumn('career_journey');
            $table->dropColumn('learning_path');
        });
    }
}
