<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

use App\Models\JobPoster;

class ChangeJobPosterRemoteWorkColumnToBool extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Since the ORM doesn't support a direct text to boolean migration we
        // have to get a little creative.

        // Add a new temp boolean column to the table
        Schema::table('job_posters', function (Blueprint $table) {
            $table->boolean('remote_work_allowed_new')->default(false);
        });

        // Loop through the existing entries and populate the new column
        $jobPosters = JobPoster::all();
        if ($jobPosters) {
            foreach ($jobPosters as $jobPoster) {
                if ($jobPoster->remote_work_allowed === '1' || $jobPoster->remote_work_allowed === true) {
                    $jobPoster->remote_work_allowed_new = true;
                } elseif ($jobPoster->remote_work_allowed === '0' || $jobPoster->remote_work_allowed === false) {
                    $jobPoster->remote_work_allowed_new = false;
                }

                $jobPoster->save();
            }
        }

        // Drop the old column
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn('remote_work_allowed');
        });

        // Rename the new one
        Schema::table('job_posters', function (Blueprint $table) {
            $table->renameColumn('remote_work_allowed_new', 'remote_work_allowed');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Since the ORM doesn't support a direct boolean to text migration we
        // have to get a little creative.

        // Add a new temp string column to the table
        Schema::table('job_posters', function (Blueprint $table) {
            $table->string('remote_work_allowed_new')->default('0');
        });

        // Loop through the existing entries and populate the new column
        $jobPosters = JobPoster::all();
        if ($jobPosters) {
            foreach ($jobPosters as $jobPoster) {
                if ($jobPoster->remote_work_allowed === '1' || $jobPoster->remote_work_allowed === true) {
                    $jobPoster->remote_work_allowed_new = '1';
                } elseif ($jobPoster->remote_work_allowed === '0' || $jobPoster->remote_work_allowed === false) {
                    $jobPoster->remote_work_allowed_new = '0';
                }

                $jobPoster->save();
            }
        }

        // Drop the old column
        Schema::table('job_posters', function (Blueprint $table) {
            $table->dropColumn('remote_work_allowed');
        });

        // Rename the new one
        Schema::table('job_posters', function (Blueprint $table) {
            $table->renameColumn('remote_work_allowed_new', 'remote_work_allowed');
        });
    }
}
