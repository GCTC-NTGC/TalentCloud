<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddHrAdvisorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hr_advisors', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->unique()->index();
            $table->integer('department_id')->unsigned()->nullable()->index();
            $table->timestamps();
        });

        Schema::table('hr_advisors', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('CASCADE')->onDelete('CASCADE');
            $table->foreign('department_id')->references('id')->on('departments')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('hr_advisors');
    }
}
