<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddExperienceTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $experience_types = [
            'work' => json_encode([
                'en' => 'Work',
                'fr' => ''
            ]),
            'personal' => json_encode([
                'en' => 'Personal',
                'fr' => ''
            ]),
            'education' => json_encode([
                'en' => 'Education',
                'fr' => ''
            ]),
            'awards' => json_encode([
                'en' => 'Awards',
                'fr' => ''
            ]),
            'community' => json_encode([
                'en' => 'Community',
                'fr' => ''
            ])
        ];

        Schema::create('experience_types', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name');
            $table->json('value');
            $table->timestamps();
        });


        foreach ($experience_types as $name => $value) {
            DB::table('experience_types')->insert([
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
        Schema::dropIfExists('experience_types');
    }
}
