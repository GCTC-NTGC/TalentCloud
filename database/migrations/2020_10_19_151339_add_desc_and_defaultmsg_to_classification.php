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

            $table->json('defaultMessage')->default(json_encode([
                'en' => '',
                'fr' => '',
            ]));
        });

        $defaultMessage = json_encode([
            'en' => 'AS - Administrative Services',
            'fr' => ''
        ]);

        DB::table('classifications')->where('key', 'AS')->update(
            ['defaultMessage' => $defaultMessage]
        );


        $defaultMessage = json_encode([
            'en' => 'BI - Biological Sciences',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'BI')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'CO - Commerce',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'CO')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'CR - Clerical and Regulatory',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'CR')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'CS - Computer Systems',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'CS')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'EC - Economics and Social Science Services',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'EC')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'EX - Executive',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'EX')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'FO - Forestry',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'FO')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'IS - Information Services',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'IS')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'PC - Physical Sciences',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'PC')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'PE - Personnel Administration',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'PE')->update(
            ['defaultMessage' => $defaultMessage]
        );

        $defaultMessage = json_encode([
            'en' => 'PM - Programme Administration',
            'fr' => ''
        ]);
        DB::table('classifications')->where('key', 'PM')->update(
            ['defaultMessage' => $defaultMessage]
        );
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
