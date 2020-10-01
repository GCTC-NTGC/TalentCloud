<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CopyWorkExperiencesToExperiencesWork extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $workExperiences = DB::table('work_experiences')->get();

        foreach ($workExperiences as $work) {
            DB::table('experiences_work')->insert([
                'title' => $work->role,
                'organization' => $work->company,
                'group' => $work->description,
                'start_date' => $work->start_date,
                'end_date' => $work->end_date,
                'experienceable_id' => $work->experienceable_id,
                'experienceable_type' => $work->experienceable_type,
                'created_at' => $work->created_at,
                'updated_at' => $work->updated_at
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
        // Cannot be reversed.
    }
}
