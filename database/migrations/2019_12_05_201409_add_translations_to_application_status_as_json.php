<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTranslationsToApplicationStatusAsJson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('application_status', function (Blueprint $table) {
            $table->json('value')->nullable();
        });

        $statuses = DB::table('application_status')->get();

        foreach ($statuses as $status) {
            $statusTranslationsEnglish = DB::table('application_status_translations')->where('application_status_id', $status->id)->where('locale', 'en')->first();
            $statusTranslationsFrench = DB::table('application_status_translations')->where('application_status_id', $status->id)->where('locale', 'fr')->first();

            $status->value = collect([$statusTranslationsEnglish->locale => $statusTranslationsEnglish->value, $statusTranslationsFrench->locale => $statusTranslationsFrench->value])->toJson();

            DB::table('application_status')->where('id', $status->id)->update([
                'id' => $status->id,
                'value' => $status->value,
            ]);
        }

        Schema::drop('application_status_translations');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('application_status', function (Blueprint $table) {
            $table->dropColumn('value');
        });
    }
}
