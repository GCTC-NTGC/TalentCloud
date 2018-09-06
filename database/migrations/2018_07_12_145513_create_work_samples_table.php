<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkSamplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_samples', function (Blueprint $table) {
            $table->increments('id');
			$table->text('name')->nullable();
			$table->date('date_created')->nullable();
			$table->integer('file_type_id')->unsigned()->nullable();
			$table->text('url')->nullable();
			$table->text('description')->nullable();
            $table->integer('applicant_id')->unsigned();
			$table->timestamps();
        });

        // Schema::table('work_samples', function(Blueprint $table)
		// {
        //     $table->foreign('applicant_id')->references('id')->
        //         on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
		// 	$table->foreign('file_type_id')->references('id')->
        //         on('file_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
		// });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('work_samples');
    }
}
