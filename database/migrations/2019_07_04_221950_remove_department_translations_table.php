<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveDepartmentTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('department_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('department_translations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('department_id')->unsigned()->index();
            $table->string('locale');
            $table->string('value');
            $table->timestamps();
            $table->unique(['department_id','locale']);
        });
    }
}
