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
        Schema::create('experiences_work', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('organization');
            $table->string('group')->nullable();
            $table->boolean('is_active')->default(false);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->integer('experienceable_id')->unsigned()->index();
            $table->string('experienceable_type');
            $table->boolean('is_education_requirement')->default(false);
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
        Schema::dropIfExists('experiences_work');
    }
}
