<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClassificationIdToJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->integer('classification_id')->nullable();
            $table->foreign('classification_id')->references('id')->on('classifications')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropForeign(['classification_id']);
            $table->dropColumn('classification_id');
        });
    }
}
