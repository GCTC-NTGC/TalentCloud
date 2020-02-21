<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperiencePersonalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_personal', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('experience_type_id')->unsigned();
            $table->integer('personal_experienceable_id')->unsigned();
            $table->string('personal_experienceable_type')->nullable();
            $table->string('title');
            $table->longText('description');
            $table->boolean('is_shareable');
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
        Schema::dropIfExists('experience_personal');
    }
}
