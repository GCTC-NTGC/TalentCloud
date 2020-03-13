<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDepartmentToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('department_id')->unsigned()->nullable()->index();
            $table->foreign('department_id')->references('id')->on('departments')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });

        $managers = DB::table('managers')->get();

        foreach ($managers as $manager) {
            $department = $manager->department_id;
            DB::table('users')->where('id', $manager->id)->update(['department_id' => $department]);
        }

        $hr_advisors = DB::table('hr_advisors')->get();

        foreach ($hr_advisors as $advisor) {
            $department = $advisor->department_id;
            DB::table('users')->where([
                ['id', $advisor->id],
                ['department_id', null]
            ])->update(['department_id' => $department]);
        }

        Schema::table('managers', function (Blueprint $table) {
            $table->dropColumn('department_id');
        });

        Schema::table('hr_advisors', function (Blueprint $table) {
            $table->dropColumn('department_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // This migration cannot be reversed.
    }
}
