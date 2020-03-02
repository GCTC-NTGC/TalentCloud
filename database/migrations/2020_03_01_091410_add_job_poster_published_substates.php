<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJobPosterPublishedSubstates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         $newStatuses = [
            'ready' => json_encode([
                'en' => 'Ready to Post',
                'fr' => 'Prêt à poster'
            ]),
            'live' => json_encode([
                'en' => 'Live',
                'fr' => 'En ligne',
            ]),
            'assessment' => json_encode([
                'en' => 'In Assessment',
                'fr' => 'En cours d\'évaluation',
            ]),
        ];
        foreach ($newStatuses as $key => $name) {
            DB::table('job_poster_status')->insert([
                'key' => $key, 'name' => $name
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
        DB::table('job_poster_status')->whereIn('key', ['ready', 'live', 'assessment'])->delete();
    }
}
