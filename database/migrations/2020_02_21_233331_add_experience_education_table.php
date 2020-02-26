<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperienceEducationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_education', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('education_type_id')->unsigned();
            $table->string('area_of_study');
            $table->string('institution');
            $table->integer('education_status_id')->unsigned();
            $table->boolean('is_active')->default(false);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('thesis_title')->nullable();
            $table->boolean('has_blockcert')->nullable();
            $table->integer('experienceable_id')->unsigned()->index();
            $table->string('experienceable_type');
            $table->timestamps();

            $table->foreign('education_type_id')
                ->references('id')
                ->on('education_types')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');

            $table->foreign('education_status_id')
                ->references('id')
                ->on('education_statuses')
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
        Schema::dropIfExists('experience_education');
    }
}
