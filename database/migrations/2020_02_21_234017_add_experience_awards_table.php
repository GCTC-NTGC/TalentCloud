<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperienceAwardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_awards', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('experience_type_id')->unsigned();
            $table->integer('awards_experienceable_id')->unsigned();
            $table->string('awards_experienceable_type')->nullable();
            $table->string('title');
            $table->integer('recipient_type_id')->unsigned();
            $table->string('issued_by');
            $table->integer('scope_type_id')->unsigned();
            $table->date('awarded_date')->nullable();
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
        Schema::dropIfExists('experience_awards');
    }
}
