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
        Schema::create('experience_award', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->integer('award_recipient_type_id')->unsigned();
            $table->string('issued_by');
            $table->integer('award_recognition_type_id')->unsigned();
            $table->date('awarded_date')->nullable();
            $table->integer('experienceable_id')->unsigned()->index();
            $table->string('experienceable_type');
            $table->timestamps();

            $table->foreign('award_recipient_type_id')
                ->references('id')
                ->on('award_recipient_types')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');

            $table->foreign('award_recognition_type_id')
                ->references('id')
                ->on('award_recognition_types')
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
        Schema::dropIfExists('experience_award');
    }
}
