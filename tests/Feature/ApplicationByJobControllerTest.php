<?php

namespace Tests\Feature;

use App\Http\Controllers\ApplicationByJobController;
use App\Models\Applicant;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Manager;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicationByJobControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndexViewFailsForPublic() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $response = $this->get(route('manager.jobs.applications', $job->id));
        $response->assertRedirect(route('manager.login'));
    }

    public function testIndexViewFailsForOtherManager() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $otherManager = factory(Manager::class)->create();
        $response = $this->actingAs($otherManager->user)
            ->get(route('manager.jobs.applications', $job->id));
        $response->assertStatus(403);
    }

    public function testIndexView() : void
    {
        $manager = factory(Manager::class)->create();
        $job = factory(JobPoster::class)->state('closed')->create(['manager_id' => $manager->id]);
        $job->job_applications()->saveMany(factory(JobApplication::class, 5))->create([
            'job_poster_id' => $job->id
        ]);
        $response = $this->actingAs($manager->user)
            ->get(route('manager.jobs.applications', $job->id));
        $response->assertOk();
        foreach ($job->job_applications as $application) {
            $response->assertSee($application->applicant->user->name);
        }
    }

    public function testSubmit() : void
    {
        $job = factory(JobPoster::class)->state('published')->create();
        $applicant = factory(Applicant::class)->create();
        $application = factory(JobApplication::class)->state('draft')->create([
            'job_poster_id' => $job->id,
            'applicant_id' => $applicant->id
        ]);
        $formData = [
            'submission_signature' => 'John Doe',
            'submission_date' => \Carbon\Carbon::now()->toDateTimeString(),
            'submit' => 'submit'
        ];
        $response = $this->actingAs($applicant->user)
            ->post(route('job.application.submit', $job), $formData);
        dd($response->baseResponse);
        $response->assertRedirect(route('job.application.complete', $job));
        $this->assertEquals('submitted', $application->fresh()->application_status->name);
    }

    // TODO: test that data has been copied from profile to appliation
}
