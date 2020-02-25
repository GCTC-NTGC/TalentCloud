<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class InitializeJobPosterStatusTransitions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $statuses = DB::table('job_poster_status')->get();
        $roles = DB::table('user_roles')->get();
        $manager = $roles->firstWhere('key', 'upgradedManager');
        $hr = $roles->firstWhere('key', 'hr_advisor');
        $admin = $roles->firstWhere('key', 'admin');
        DB::table('job_poster_status_transitions')->insert([
            [
                'key' => 'draft_to_review_hr',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'draft')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'review_hr')->id,
                'owner_user_role_id' => $manager,
                'name' => json_encode([
                    'en' => 'Submit for Review',
                    'fr' => 'Submit for Review'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'review_hr_to_review_manager',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'review_hr')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'review_manager')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send to Manager',
                    'fr' => 'Send to Manager'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'review_manager_to_review_hr',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'review_manager')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'review_hr')->id,
                'owner_user_role_id' => $manager,
                'name' => json_encode([
                    'en' => 'Send to HR',
                    'fr' => 'Send to HR'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'review_hr_to_translation',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'review_hr')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'translation')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send to Translation',
                    'fr' => 'Send to Translation'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'translation_to_final_review_manager',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'translation')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_manager')->id,
                'owner_user_role_id' => $admin,
                'name' => json_encode([
                    'en' => 'Send to Manager for Final Review',
                    'fr' => 'Send to Manager for Final Review'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'final_review_manager_to_final_review_hr',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_manager')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_hr')->id,
                'owner_user_role_id' => $manager,
                'name' => json_encode([
                    'en' => 'Send to HR',
                    'fr' => 'Send to HR'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'final_review_hr_to_final_review_manager',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_hr')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_manager')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send to Manager',
                    'fr' => 'Send to Manager'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'final_review_hr_to_translation',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_hr')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'translation')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send back to Translation',
                    'fr' => 'Send back to Translation'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'final_review_manager_to_pending_approval',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_manager')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'pending_approval')->id,
                'owner_user_role_id' => $manager,
                'name' => json_encode([
                    'en' => 'Submit for Approval',
                    'fr' => 'Submit for Approval'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'pending_approval_to_final_review_manager',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'pending_approval')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'final_review_manager')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send back for Review',
                    'fr' => 'Send back for Review'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'pending_approval_to_translation',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'pending_approval')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'translation')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Send back to Translation',
                    'fr' => 'Send back to Translation'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'default'
                ]),
            ],
            [
                'key' => 'pending_approval_to_approved',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'pending_approval')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'approved')->id,
                'owner_user_role_id' => $hr,
                'name' => json_encode([
                    'en' => 'Approve',
                    'fr' => 'Approve'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'approved_to_published',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'approved')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'published')->id,
                'owner_user_role_id' => $admin,
                'name' => json_encode([
                    'en' => 'Publish',
                    'fr' => 'Publish'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'go'
                ]),
            ],
            [
                'key' => 'published_to_completed',
                'from_job_poster_status_id' => $statuses->firstWhere('key', 'published')->id,
                'to_job_poster_status_id' => $statuses->firstWhere('key', 'completed')->id,
                'owner_user_role_id' => $admin,
                'name' => json_encode([
                    'en' => 'Complete',
                    'fr' => 'Complete'
                ]),
                'metadata' => json_encode([
                    'button_style' => 'stop'
                ]),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('job_poster_status_transitions')->truncate();
    }
}
