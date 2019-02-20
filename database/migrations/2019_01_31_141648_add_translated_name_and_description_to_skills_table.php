<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Lang;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Models\Skill;

class AddTranslatedNameAndDescriptionToSkillsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->json('name')->nullable();
            $table->json('description')->nullable();
        });

        $skills = Skill::all();
        $langEn = Lang::get('common/skills.skills', [], 'en');
        $langFr = Lang::get('common/skills.skills', [], 'fr');

        foreach ($skills as $skill) {
            if (!array_key_exists($skill->key, $langEn) || !array_key_exists($skill->key, $langFr)) {
                continue;
            }
            $skill
                ->setTranslation('name', 'en', $langEn[$skill->key]['name'])
                ->setTranslation('name', 'fr', $langFr[$skill->key]['name'])
                ->setTranslation('description', 'en', $langEn[$skill->key]['description'])
                ->setTranslation('description', 'fr', $langFr[$skill->key]['description'])
                ->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->dropColumn(['name', 'description']);
        });
    }
}
