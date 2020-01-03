<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('job_poster_id');
            $table->foreign('job_poster_id')->references('id')->on('job_posters')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->integer('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('NO ACTION');
            $table->text('comment');
            $table->text('location');
            $table->integer('type_id')->nullable();
            $table->foreign('type_id')->references('id')->on('comment_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
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
        Schema::dropIfExists('comments');
    }
}
