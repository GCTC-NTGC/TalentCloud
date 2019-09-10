<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class TransferClassificationCodeToClassificationIdOnJobPosters extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $jobs = DB::table('job_posters')->get();

        foreach ($jobs as $job) {
            $classificationId = DB::table('classifications')->where('key', $job->classification_code)->first();
            if ($classificationId !== null) {
                DB::table('job_posters')->where('id', $job->id)->update(['classification_id' => $classificationId->id]);
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $jobs = DB::table('job_posters')->get();

        foreach ($jobs as $job) {
            DB::table('job_posters')->where('id', $job->id)->update(['classification_id' => null]);
        }
    }
}
