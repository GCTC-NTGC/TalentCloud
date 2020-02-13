<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddNameToUserRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $roles = [
            'basic' => json_encode([
                'en' => 'Applicant',
                'fr' => 'candidat'
            ]),
            'upgradedManager' => json_encode([
                'en' => 'Manager',
                'fr' => 'gestionnaire'
            ]),
            'admin' => json_encode([
                'en' => 'Admin',
                'fr' => 'Admin'
            ]),
            'hr_advisor' => json_encode([
                'en' => 'HR Advisor',
                'fr' => 'conseiller des RH'
            ]),
        ];

        Schema::table('user_roles', function (Blueprint $table) {
            $table->json('name')->nullable();
        });

        foreach ($roles as $key => $name) {
            DB::table('user_roles')
                ->where('key', $key)
                ->update([
                    'name' => $name
                ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_roles', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }
}
