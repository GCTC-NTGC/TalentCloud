<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToManagersAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->json('about_me')->nullable();
            $table->json('greatest_accomplishment')->nullable();
            $table->json('division')->nullable();
            $table->json('position')->nullable();
            $table->json('leadership_style')->nullable();
            $table->json('employee_learning')->nullable();
            $table->json('expectations')->nullable();
            $table->json('education')->nullable();
            $table->json('career_journey')->nullable();
            $table->json('learning_path')->nullable();
        });

        $managers = DB::table('managers')->get();

        foreach ($managers as $manager) {
            $managerTranslationsEnglish = DB::table('manager_translations')->where('manager_id', $manager->id)->where('locale', 'en')->first();
            $managerTranslationsFrench = DB::table('manager_translations')->where('manager_id', $manager->id)->where('locale', 'fr')->first();

            $manager->about_me = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->about_me, $managerTranslationsFrench->locale => $managerTranslationsFrench->about_me])->toJson();

            $manager->greatest_accomplishment = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->greatest_accomplishment, $managerTranslationsFrench->locale => $managerTranslationsFrench->greatest_accomplishment])->toJson();

            $manager->division = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->division, $managerTranslationsFrench->locale => $managerTranslationsFrench->division])->toJson();

            $manager->position = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->position, $managerTranslationsFrench->locale => $managerTranslationsFrench->position])->toJson();

            $manager->leadership_style = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->leadership_style, $managerTranslationsFrench->locale => $managerTranslationsFrench->leadership_style])->toJson();

            $manager->employee_learning = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->employee_learning, $managerTranslationsFrench->locale => $managerTranslationsFrench->employee_learning])->toJson();

            $manager->expectations = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->expectations, $managerTranslationsFrench->locale => $managerTranslationsFrench->expectations])->toJson();

            $manager->education = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->education, $managerTranslationsFrench->locale => $managerTranslationsFrench->education])->toJson();

            $manager->career_journey = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->career_journey, $managerTranslationsFrench->locale => $managerTranslationsFrench->career_journey])->toJson();

            $manager->learning_path = collect([$managerTranslationsEnglish->locale => $managerTranslationsEnglish->learning_path, $managerTranslationsFrench->locale => $managerTranslationsFrench->learning_path])->toJson();

            DB::table('managers')->where('id', $manager->id)->update([
                'id' => $manager->id,
                'about_me' => $manager->about_me,
                'greatest_accomplishment' => $manager->greatest_accomplishment,
                'division' => $manager->division,
                'position' => $manager->position,
                'leadership_style' => $manager->leadership_style,
                'employee_learning' => $manager->employee_learning,
                'expectations' => $manager->expectations,
                'education' => $manager->education,
                'career_journey' => $manager->career_journey,
                'learning_path' => $manager->learning_path
            ]);
        }

        Schema::drop('manager_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('managers', function (Blueprint $table) {
            $table->dropColumn([
                'about_me',
                'greatest_accomplishment',
                'division',
                'position',
                'leadership_style',
                'employee_learning',
                'expectations',
                'education',
                'career_journey',
                'learning_path'
            ]);
        });
    }
}
