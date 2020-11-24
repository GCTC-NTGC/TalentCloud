<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSkillCategoriesSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('skill_categories_skills', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('skill_id');
            $table->foreign('skill_id')
                  ->references('id')
                  ->on('skills')->onDelete('cascade');
            $table->integer('skill_category_id');
            $table->foreign('skill_category_id')
                  ->references('id')
                  ->on('skill_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('skill_categories_skills');
    }
}
