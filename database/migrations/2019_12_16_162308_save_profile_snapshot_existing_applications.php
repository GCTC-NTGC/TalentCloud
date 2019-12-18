<?php

use App\Models\JobApplication;
use App\Models\Lookup\ApplicationStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class SaveProfileSnapshotExistingApplications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $draftStatusId = ApplicationStatus::where('name', 'draft')->firstOrFail()->id;
        // Find all applications that have been submitted, but don't have a profile snapshot.
        $applications = JobApplication::whereNull('user_email')->where('application_status_id', '!=', $draftStatusId)->get();
        foreach ($applications as $application) {
            $application->saveProfileSnapshot();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // This migration cannot be reversed.
    }
}
