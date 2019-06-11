<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateJobPosterTranslationsTableImpact extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_translations', function(Blueprint $table)
		{
			$table->text('team_impact')->nullable();
			$table->text('hire_impact')->nullable();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_translations', function (Blueprint $table) {
            $table->dropColumn('team_impact');
            $table->dropColumn('hire_impact');
        });
    }
}
