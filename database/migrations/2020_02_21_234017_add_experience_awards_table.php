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
            $table->string('title');
            $table->integer('recipient_type_id')->unsigned();
            $table->string('issued_by');
            $table->integer('recognition_type_id')->unsigned();
            $table->date('awarded_date')->nullable();
            $table->integer('awards_experienceable_id')->unsigned()->index();
            $table->string('awards_experienceable_type')->nullable();
            $table->timestamps();

            $table->foreign('recipient_type_id')
                ->references('id')
                ->on('award_recipient_types')
                ->onUpdate('CASCADE')
                ->onDelete('NO ACTION');

            $table->foreign('recognition_type_id')
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
        Schema::dropIfExists('experience_awards');
    }
}
