<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDescAndDefaultmsgToClassification extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('classifications', function (Blueprint $table) {
            $table->string('defaultMessage')->nullable();;

            $table->string('description')->nullable();
        });

        DB::table('classifications')->where('key', 'AS')->update(
            ['defaultMessage' => 'AS - Administrative Services', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'BI')->update(
            ['defaultMessage' => 'BI - Biological Sciences', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'CO')->update(
            ['defaultMessage' => 'CO - Commerce', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'CR')->update(
            ['defaultMessage' => 'CR - Clerical and Regulatory', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'CS')->update(
            ['defaultMessage' => 'CS - Computer Systems', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'EC')->update(
            ['defaultMessage' => 'EC - Economics and Social Science Services', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'EX')->update(
            ['defaultMessage' => 'EX - Executive', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'FO')->update(
            ['defaultMessage' => 'FO - Forestry', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'IS')->update(
            ['defaultMessage' => 'IS - Information Services', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'PC')->update(
            ['defaultMessage' => 'PC - Physical Sciences', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'PE')->update(
            ['defaultMessage' => 'PE - Personnel Administration', 'description' => 'Job Classification from list of Classifications']
        );

        DB::table('classifications')->where('key', 'PM')->update(
            ['defaultMessage' => 'PM - Programme Administration', 'description' => 'Job Classification from list of Classifications']
        );

        Schema::table('classifications', function (Blueprint $table) {
            $table->string('defaultMessage')->nullable(false)->change();
            $table->string('description')->nullable(false)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classifications', function (Blueprint $table) {
            $table->dropColumn('defaultMessage');
            $table->dropColumn('description');
        });
    }
}
