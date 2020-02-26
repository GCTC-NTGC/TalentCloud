<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddExperienceAwardsRecipientTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $types = [
            'team' => json_encode([
                'en' => 'My team',
                'fr' => 'Mon équipe'
            ]),
            'project' => json_encode([
                'en' => 'My project',
                'fr' => 'Mon projet'
            ]),
            'organization' => json_encode([
                'en' => 'My organization',
                'fr' => 'Mon organisation'
            ]),
            'self' => json_encode([
                'en' => 'Myself',
                'fr' => 'Ma personne'
            ])
        ];

        Schema::create('award_recipient_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('key');
            $table->json('name');
            $table->timestamps();
        });

        foreach ($types as $key => $name) {
            DB::table('award_recipient_types')->insert([
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
        Schema::dropIfExists('award_recipient_types');
    }
}
