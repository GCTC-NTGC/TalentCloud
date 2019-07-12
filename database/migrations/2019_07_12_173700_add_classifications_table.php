<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddClassificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('classifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('key');
            $table->timestamps();
        });

        DB::table('classifications')->insert([
            ['key' => 'BI'],
            ['key' => 'CO'],
            ['key' => 'CR'],
            ['key' => 'CS'],
            ['key' => 'EC'],
            ['key' => 'EX'],
            ['key' => 'FO'],
            ['key' => 'IS'],
            ['key' => 'PC'],
            ['key' => 'PE'],
            ['key' => 'PM'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('classifications');
    }
}
