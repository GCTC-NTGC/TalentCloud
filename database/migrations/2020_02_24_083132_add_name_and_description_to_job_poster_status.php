<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddNameAndDescriptionToJobPosterStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_poster_status', function (Blueprint $table) {
            $table->renameColumn('value', 'name');
            $table->json('description')->default(json_encode([
                'en' => '',
                'fr' => '',
            ]));
        });

        $reviewDescription = json_encode([
            'en' => 'This job action is currently in the review process. This means that the poster is being edited and discussed by the manager and HR advisors to get it to a point where it can be published. When it\'s ready, the next step is translation.',
            'fr' => 'La présente mesure d\'emploi en est au stade du processus d\'examen. L\'avis d\'emploi est donc en cours de révision et fait l\'objet de discussions entre le gestionnaire et les conseillers en RH pour faire en sorte que l\'avis puisse être publié. Une fois prêt, l\'avis passe à l\'étape suivante, soit la traduction.'
        ]);
        DB::table('job_poster_status')->where('key', 'review_hr')
            ->update(['description' => $reviewDescription]);
        DB::table('job_poster_status')->where('key', 'review_manager')
            ->update(['description' => $reviewDescription]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_poster_status', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->renameColumn('name', 'value');
        });
    }
}
