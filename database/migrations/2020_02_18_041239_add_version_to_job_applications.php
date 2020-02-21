<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddVersionToJobApplications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('job_application_versions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('version');
            $table->timestamps();
        });

        DB::table('job_application_versions')->insert([
            ['version' => '1'],
            ['version' => '2'],
        ]);

        Schema::table('job_applications', function (Blueprint $table) {
            $table->integer('version_id')->nullable();
            $table->foreign('version_id')
                ->references('id')
                ->on('job_application_versions')
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
        Schema::table('job_applications', function ($table) {
            $table->dropColumn('version_id');
        });

        Schema::dropIfExists('job_application_versions');
    }
}
