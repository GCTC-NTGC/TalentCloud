<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReferencesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('references', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name')->nullable();
			$table->string('email')->nullable();
			$table->integer('relationship_id')->unsigned()->nullable();
			$table->text('description')->nullable();
            $table->integer('applicant_id')->unsigned();
			$table->timestamps();
        });

        Schema::table('references', function (Blueprint $table) {
            $table->foreign('applicant_id')->references('id')->
                on('applicants')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('relationship_id')->references('id')
                ->on('relationships')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('references');
    }
}
