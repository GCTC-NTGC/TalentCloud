<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class DeleteClassificationJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Drop classification column.
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn('classification');
        });

        // Reorder columns.
        Schema::table('job_posters', function (Blueprint $table) {
            $table->renameColumn('classification_id', 'id_old');
            $table->renameColumn('classification_level', 'level_old');
            $table->dropForeign(['classification_id']);
        });

        Schema::table('job_posters', function (Blueprint $table) {
            $table->integer('classification_id')->nullable();
            $table->integer('classification_level')->nullable();
            $table->foreign('classification_id')->references('id')->on('classifications')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });

        DB::table('job_posters')->update([
            'classification_id' => DB::raw('id_old'),
            'classification_level' => DB::raw('level_old')
        ]);

        Schema::table('job_posters', function (Blueprint $table) {

            $table->dropColumn('id_old');
            $table->dropColumn('level_old');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Only reverse the dropped column.
        Schema::table('job_posters', function (Blueprint $table) {
            $table->string('classification')->nullable();
        });
    }
}
