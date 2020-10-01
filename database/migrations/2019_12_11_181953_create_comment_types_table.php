<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comment_types', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });

        DB::table('comment_types')->insert([
            ['name' => 'question'],
            ['name' => 'recommendation'],
            ['name' => 'required_action'],

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('comment_types')->whereIn('name', ['question', 'recommendation', 'required_action'])->delete();
        Schema::dropIfExists('comment_types');
    }
}
