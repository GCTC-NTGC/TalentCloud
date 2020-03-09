<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddExperienceAwardsRecognitionTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $types = [
            'international' => json_encode([
                'en' => 'International',
                'fr' => 'Internationale'
            ]),
            'national' => json_encode([
                'en' => 'National',
                'fr' => 'Nationale'
            ]),
            'provincial' => json_encode([
                'en' => 'Provincial',
                'fr' => 'Provinciale'
            ]),
            'local' => json_encode([
                'en' => 'Local',
                'fr' => 'Local'
            ]),
            'community' => json_encode([
                'en' => 'Community',
                'fr' => 'Communautaire'
            ]),
            'organizational' => json_encode([
                'en' => 'Organizational',
                'fr' => 'Organisationnel'
            ]),
            'sub_organizational' => json_encode([
                'en' => 'Sub-organizational (branch or division)',
                'fr' => 'Sous-organisationnel (direction générale ou division)'
            ])
        ];

        Schema::create('award_recognition_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('key');
            $table->json('name');
            $table->timestamps();
        });

        foreach ($types as $key => $name) {
            DB::table('award_recognition_types')->insert([
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
        Schema::dropIfExists('award_recognition_types');
    }
}
