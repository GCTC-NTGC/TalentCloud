<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddEducationRequirementsToClassificationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('classifications', function (Blueprint $table) {
            $table->json('education_requirements')->default(json_encode([
                'en' => '',
                'fr' => '',
            ]));
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('classifications', function (Blueprint $table) {
            $table->dropColumn('education_requirements');
        });
    }
}
