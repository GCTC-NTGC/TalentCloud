<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoteRemoteWorkAllowedFromWorkEnvironment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->dropColumn('remote_work_allowed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_environments', function (Blueprint $table) {
            $table->boolean('remote_work_allowed')->nullable();
        });
    }
}
