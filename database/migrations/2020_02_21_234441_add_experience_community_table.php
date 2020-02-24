<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddExperienceCommunityTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('experience_community', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('group');
            $table->string('project');
            $table->boolean('is_active')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('community_experienceable_id')->unsigned()->index();
            $table->string('community_experienceable_type')->nullable();
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
        Schema::dropIfExists('experience_community');
    }
}
