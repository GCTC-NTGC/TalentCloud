<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddExperienceEducationStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $statuses = [
            'complete_credited' => json_encode([
                'en' => 'Complete (credential awarded)',
                'fr' => ''
            ]),
            'complete_uncredited' => json_encode([
                'en' => 'Complete (no credential awarded)',
                'fr' => ''
            ]),
            'in_progress' => json_encode([
                'en' => 'In Progress',
                'fr' => 'En cours'
            ]),
            'audited' => json_encode([
                'en' => 'Audited',
                'fr' => 'Audité'
            ]),
            'incomplete' => json_encode([
                'en' => 'Incomplete',
                'fr' => 'Incomplet'
            ])
        ];

        Schema::create('education_statuses', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name');
            $table->json('value');
            $table->timestamps();
        });

        foreach ($statuses as $name => $value) {
            DB::table('education_statuses')->insert([
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
        Schema::dropIfExists('education_statuses');
    }
}
