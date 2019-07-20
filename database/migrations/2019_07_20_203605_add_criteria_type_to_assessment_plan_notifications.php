<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCriteriaTypeToAssessmentPlanNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('assessment_plan_notifications', function (Blueprint $table) {
            $table->integer('criteria_type_id_new')->unsigned()->nullable();

            $table->foreign('criteria_type_id_new')->references('id')->on('criteria_types')->onUpdate('CASCADE')->onDelete('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assessment_plan_notifications', function (Blueprint $table) {
            $table->dropForeign('assessment_plan_notifications_criteria_type_id_new_foreign');

            $table->dropColumn('criteria_type_id_new');
        });
    }
}
