<?php

use Illuminate\Database\Migrations\Migration;

class AddNrcToDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('departments')->insert([
            ['name' => 'national_research_council']
        ]);

        DB::table('department_translations')->insert([
            ['department_id' => '13', 'locale' => 'en', 'value' => 'National Research Council Canada', 'impact' => 'The National Research Council Canada (NRC) is the Government of Canada\'s largest science and research organization. The NRC partners with Canadian industry to take research impacts from the lab to the marketplace, where people can experience the benefits.'],
            ['department_id' => '13', 'locale' => 'fr', 'value' => 'Conseil national de recherches Canada', 'impact' => 'Le Conseil national de recherches Canada (CNRC) est l\'organisation scientifique et de recherche la plus importante du gouvernement canadien. Le CNRC s\'associe à l\'industrie canadienne pour sortir la recherche du laboratoire et lui trouver des applications commerciales dont les retombées bénéficieront à l\'ensemble de la population.'],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('departments')->whereIn('id', [13])->delete();
        DB::table('department_translations')->whereIn('id', [25, 26])->delete();
    }
}
