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
            $table->string('title');
            $table->string('organization');
            $table->string('group')->nullable();
            $table->boolean('is_active')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('work_experienceable_id')->unsigned()->index();
            $table->string('work_experienceable_type')->nullable();
            $table->timestamps();
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
