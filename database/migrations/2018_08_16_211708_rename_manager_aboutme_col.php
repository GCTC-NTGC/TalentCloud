<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameManagerAboutmeCol extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('manager_translations', function (Blueprint $table) {
            $table->renameColumn('aboutme', 'about_me');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('manager_translations', function (Blueprint $table) {
            $table->renameColumn('about_me', 'aboutme');
        });
    }
}
