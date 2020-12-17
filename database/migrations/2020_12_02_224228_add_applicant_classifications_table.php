<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddApplicantClassificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('applicant_classifications', function (Blueprint $table) {
            $table->integer('applicant_id');
            $table->integer('classification_id');
            $table->integer('level');
            $table->integer('order');
        });

        Schema::table('applicant_classifications', function (Blueprint $table) {
            $table->foreign('applicant_id')
                ->references('id')
                ->on('applicants')
                ->onUpdate('CASCADE')
                ->onDelete('CASCADE');

            $table->foreign('classification_id')
                ->references('id')
                ->on('classifications')
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
        Schema::dropIfExists('applicant_classifications');
    }
}
