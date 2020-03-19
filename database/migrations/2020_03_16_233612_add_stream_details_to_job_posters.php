<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStreamDetailsToJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_posters', function (Blueprint $table) {
            $table->integer('talent_stream_id')->nullable();
            $table->integer('talent_stream_category_id')->nullable();
            $table->integer('job_skill_level_id')->nullable();

            $table->foreign('talent_stream_id')
                ->references('id')
                ->on('talent_streams')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
            $table->foreign('talent_stream_category_id')
                ->references('id')
                ->on('talent_stream_categories')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
            $table->foreign('job_skill_level_id')
                ->references('id')
                ->on('job_skill_levels')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');
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
            $table->dropForeign(['talent_stream_id']);
            $table->dropForeign(['talent_stream_category_id']);
            $table->dropForeign(['job_skill_level_id']);

            $table->dropColumn('talent_stream_id');
            $table->dropColumn('talent_stream_category_id');
            $table->dropColumn('job_skill_level_id');
        });
    }
}
