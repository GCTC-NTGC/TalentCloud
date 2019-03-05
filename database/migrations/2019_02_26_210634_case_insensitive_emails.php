<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CaseInsensitiveEmails extends Migration
{
    /**
    * Run the migrations.
    *
    * @return void
    */
    public function up()
    {
        DB::unprepared('
            CREATE EXTENSION IF NOT EXISTS citext;
            ALTER TABLE users ALTER COLUMN email TYPE citext;
        ');
    }

    /**
    * Reverse the migrations.
    *
    * @return void
    */
    public function down()
    {
        DB::unprepared('
            DROP EXTENSION citext;
            ALTER TABLE users ALTER COLUMN email TYPE character varying(191);
        ');
    }
}
