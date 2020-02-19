<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddOrderToJobPosterKeyTasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_key_tasks', function (Blueprint $table) {
            $table->integer('order')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_key_tasks', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
}
