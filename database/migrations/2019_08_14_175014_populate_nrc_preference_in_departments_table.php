<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PopulateNrcPreferenceInDepartmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('departments', function (Blueprint $table) {
            $preference = [
                'en' => 'For jobs posted by the National Research Council, preference will be given to National Research Council employees and Canadian citizens.',
                'fr' => 'Les postes affichés par le Conseil national de recherches du Canada accordera la préférence aux employés du Conseil national de recherches du Canada et aux citoyens canadiens.'
            ];

            // Not a huge fan of using hardcoded ID's, but here we are.
            DB::table('departments')->where('id', 13)->update([
                'preference' => json_encode($preference)
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('departments', function (Blueprint $table) {
            DB::table('departments')->where('id', 13)->update([
                'preference' => null
            ]);
        });
    }
}
