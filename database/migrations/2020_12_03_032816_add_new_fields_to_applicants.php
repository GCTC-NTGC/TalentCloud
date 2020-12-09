<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNewFieldsToApplicants extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('applicants', function (Blueprint $table) {
            $table->integer('citizenship_declaration_id')->unsigned()->nullable();
            $table->integer('veteran_status_id')->unsigned()->nullable();
            $table->foreign('citizenship_declaration_id')
                ->references('id')
                ->on('citizenship_declarations')
                ->onUpdate('CASCADE');

            $table->foreign('veteran_status_id')
                ->references('id')
                ->on('veteran_statuses')
                ->onUpdate('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('applicants', function (Blueprint $table) {
            $table->dropForeign('applicants_citizenship_declaration_id_foreign');
            $table->dropForeign('applicants_veteran_status_id_foreign');
        });
    }
}
