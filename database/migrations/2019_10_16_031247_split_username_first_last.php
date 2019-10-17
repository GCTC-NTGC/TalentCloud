<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SplitUsernameFirstLast extends Migration
{
    // Function to separate user name into first/last name strings.
    private function splitName($fullName)
    {
        $matches = array();
        preg_match_all(
            '/((\S+\s+)*)(\S+)/',
            $fullName,
            $matches
        );
        $firstName = $matches[1][0];
        $lastName = $matches[3][0];
        return [$firstName, $lastName];
    }

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

        // Get records from user table.
        $users = DB::table('users')->get();

        // Loop through the name column, split values, and populate first/last names.
        foreach ($users as $user) {
            $fullName = $user->name;
            $nameArray = $this->splitName($fullName);
            $firstName = $nameArray[0];
            $lastName = $nameArray[1];
            DB::table('users')->where('id', $user->id)->update(['first_name' => $firstName, 'last_name' => $lastName]);
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
