<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToJobTermsAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('job_terms', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $terms = DB::table('job_terms')->get();

        foreach ($terms as $term) {
            $termTranslationsEnglish = DB::table('job_term_translations')->where('job_term_id', $term->id)->where('locale', 'en')->first();
            $termTranslationsFrench = DB::table('job_term_translations')->where('job_term_id', $term->id)->where('locale', 'fr')->first();

            $term->value = collect([$termTranslationsEnglish->locale => $termTranslationsEnglish->value, $termTranslationsFrench->locale => $termTranslationsFrench->value])->toJson();

            DB::table('job_terms')->where('id', $term->id)->update([
                'id' => $term->id,
                'value' => $term->value,
            ]);
        }

        Schema::drop('job_term_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('job_terms', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
