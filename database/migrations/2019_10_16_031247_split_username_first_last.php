<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SplitUsernameFirstLast extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Add first/last name columns.
        Schema::table('users', function (Blueprint $table) {
            $table->string('first_name')->after('name')->nullable();
            $table->string('last_name')->after('first_name')->nullable();
        });

        // Get records from (old) name column.
        $results = DB::table('users')->get();

        // Loop through the results of the name column, split the values.
        foreach ($results as $result) {
            $split_value = explode(' ', $result->name);

            // Insert the split values into new columns.
            DB::table('users')->where('id', $result->id)->update([
                'first_name' => $split_value[0],
                'last_name'  => $split_value[1]
            ]);
        }

        // Delete old name column.
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Add the name column.
        Schema::table('users', function ($table) {
            $table->string('name')->nullable();
        });

        // Get records from first/last name columns.
        $results = DB::table('users')->get();

        // Loop through the results of the new columns and merge them.
        foreach ($results as $result) {
            $merged_value = implode(' ', [$result->first_name, $result->last_name]);

            // Insert the split values into re-made old column.
            DB::table('users')->where('id', $result->id)->update([
                'name' => $merged_value
            ]);
        }

        // Delete first/last name columns.
        Schema::table('users', function ($table) {
            $table->dropColumn('first_name');
            $table->dropColumn('last_name');
        });
    }
}
