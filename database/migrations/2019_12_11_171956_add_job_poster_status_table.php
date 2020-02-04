<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddJobPosterStatusTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $statuses = [
            'draft' => json_encode([
                'en' => 'Draft',
                'fr' => 'Provisoire'
            ]),
            'submitted' => json_encode([
                'en' => 'Submitted',
                'fr' => 'Soumis'
            ]),
            'pending' => json_encode([
                'en' => 'Pending',
                'fr' => 'Pendant'
            ]),
            'approved' => json_encode([
                'en' => 'Approved',
                'fr' => 'Approuvé'
            ]),
            'published' => json_encode([
                'en' => 'Published',
                'fr' => 'Publié'
            ]),
            'closed' => json_encode([
                'en' => 'Closed',
                'fr' => 'Fermée'
            ]),
            'complete' => json_encode([
                'en' => 'Complete',
                'fr' => 'Terminé'
            ])
        ];

        Schema::create('job_poster_status', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name');
            $table->json('value');
            $table->timestamps();
        });

        foreach ($statuses as $name => $value) {
            DB::table('job_poster_status')->insert([
                'name' => $name, 'value' => $value
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
        Schema::dropIfExists('job_poster_status');
    }
}
