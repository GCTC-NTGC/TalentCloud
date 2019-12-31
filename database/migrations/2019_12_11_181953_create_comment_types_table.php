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
            ['id' => 1, 'name' => 'question'],
            ['id' => 2, 'name' => 'recommendation'],
            ['id' => 3, 'name' => 'required_action'],

        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('comment_types')->whereIn('id', [1, 2, 3])->delete();
        Schema::dropIfExists('comment_types');
    }
}
