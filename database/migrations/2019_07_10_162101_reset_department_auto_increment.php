<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ResetDepartmentAutoIncrement extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $connection = config('database.default');
        if ($connection === 'pgsql') {
            $nextId = DB::table('departments')->max('id') + 1;
            DB::statement("ALTER SEQUENCE departments_id_seq RESTART WITH $nextId;");
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
