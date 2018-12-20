<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateApplicationStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('application_status')->insert([
            ['id' => 1, 'name' => 'draft'],
            ['id' => 2, 'name' => 'submitted'],
            ['id' => 3, 'name' => 'requires_action'],
            ['id' => 4, 'name' => 'under_review'],
            ['id' => 5, 'name' => 'rejected'],
        ]);

        DB::table('application_status_translations')->insert([
            ['id' => 1, 'application_status_id' => 1, 'locale' => 'en', 'value' => 'Draft'],
            ['id' => 2, 'application_status_id' => 1, 'locale' => 'fr', 'value' => 'Provisoire'],
            ['id' => 3, 'application_status_id' => 2, 'locale' => 'en', 'value' => 'Submitted'],
            ['id' => 4, 'application_status_id' => 2, 'locale' => 'fr', 'value' => 'Soumis'],
            ['id' => 5, 'application_status_id' => 3, 'locale' => 'en', 'value' => 'Requires Action'],
            ['id' => 6, 'application_status_id' => 3, 'locale' => 'fr', 'value' => 'Nécessite une action'],
            ['id' => 7, 'application_status_id' => 4, 'locale' => 'en', 'value' => 'Under Review'],
            ['id' => 8, 'application_status_id' => 4, 'locale' => 'fr', 'value' => 'À létude'],
            ['id' => 9, 'application_status_id' => 5, 'locale' => 'en', 'value' => 'Rejected'],
            ['id' => 10, 'application_status_id' => 5, 'locale' => 'fr', 'value' => 'Rejeté'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('application_status')->whereIn('id', [1, 2, 3, 4, 5])->delete();
        DB::table('application_status_translations')->whereIn('id', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])->delete();
    }
}
