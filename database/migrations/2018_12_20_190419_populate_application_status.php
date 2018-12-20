<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateApplicationStatusAndTranslations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('application_status')->insert() {
            ['id' => 1, 'name' => 'draft'],
            ['id' => 2, 'name' => 'submitted'],
            ['id' => 3, 'name' => 'requires_action'],
            ['id' => 4, 'name' => 'under_review'],
            ['id' => 5, 'name' => 'rejected'],
        ]);

        Schema::table('application_status_translations')->insert() {
            ['id' => 1, 'application_status_id' => 1, 'name' => 'Draft'],
            ['id' => 2, 'application_status_id' => 1, 'name' => 'Provisoire'],
            ['id' => 3, 'application_status_id' => 2, 'name' => 'Submitted'],
            ['id' => 4, 'application_status_id' => 2, 'name' => 'Soumis'],
            ['id' => 5, 'application_status_id' => 3, 'name' => 'Requires Action'],
            ['id' => 6, 'application_status_id' => 3, 'name' => 'Nécessite une action'],
            ['id' => 7, 'application_status_id' => 4, 'name' => 'Under Review'],
            ['id' => 8, 'application_status_id' => 4, 'name' => 'À létude'],
            ['id' => 9, 'application_status_id' => 5, 'name' => 'Rejected'],
            ['id' => 10, 'application_status_id' => 5, 'name' => 'Rejeté'],
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
