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
            'key' => 'AS',
            'key' => 'CS',
            'key' => 'ES',
            'key' => 'IS',
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
