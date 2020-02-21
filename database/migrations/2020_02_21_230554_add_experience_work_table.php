<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperienceWorkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_work', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('experience_type_id')->unsigned();
            $table->integer('work_experienceable_id')->unsigned();
            $table->string('work_experienceable_type')->nullable();
            $table->string('title');
            $table->string('organization');
            $table->string('group')->nullable();
            $table->boolean('is_active')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();

            $table->foreign('experience_type_id')->references('id')->on('experience_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('experience_work');
    }
}
