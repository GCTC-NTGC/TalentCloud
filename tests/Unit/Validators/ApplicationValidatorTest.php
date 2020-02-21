<?php

namespace Tests\Unit\Validators;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobApplication;
use App\Models\Applicant;
use App\Models\JobApplicationAnswer;
use App\Models\JobPoster;
use App\Services\Validation\ApplicationValidator;
use Illuminate\Foundation\Testing\WithFaker;

class ApplicationValidatorTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function testBasicsComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationValidator();

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->create([
        'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $this->assertTrue($validator->basicsComplete($completeApplication));

        // Removing Answers should invalidate basic step.
        $incompleteApplication = factory(JobApplication::class)->create([
        'applicant_id' => $applicant->id
        ]);
        $incompleteApplication->job_application_answers()->delete();
        $this->assertFalse($validator->basicsComplete($incompleteApplication));

        // Having one answer empty should invalidate basic step.
        $wrongApp1 = factory(JobApplication::class)->create([
        'applicant_id' => $applicant->id
        ]);
        $answer = $wrongApp1->job_application_answers->first();
        $answer->answer = '';
        $answer->save();
        $this->assertFalse($validator->basicsComplete($wrongApp1));

        // Having an extra answer, related to the wrong job, should invalidate.
        $wrongApp2 = factory(JobApplication::class)->create([
        'applicant_id' => $applicant->id
        ]);
        $job2 = factory(JobPoster::class)->create();
        $wrongApp2->job_application_answers()->save(factory(JobApplicationAnswer::class)->create([
        'job_application_id' => $wrongApp2->id,
        'job_poster_question_id' => $job2->job_poster_questions->first()->id
        ]));
        $this->assertFalse($validator->basicsComplete($wrongApp2));
    }

    public function testExperienceComplete(): void
    {
        $validator = new ApplicationValidator();

        // For experience step to be complete, 'experienc_saved' simply needs to be true.
        $application = factory(JobApplication::class)->create([
        'experience_saved' => false
        ]);
        $this->assertFalse($validator->experienceComplete($application));

        $completeApp = factory(JobApplication::class)->create([
        'experience_saved' => true
        ]);
        $this->assertTrue($validator->experienceComplete($completeApp));
    }

    public function testSkillsComplete(): void
    {
        $validator = new ApplicationValidator();

        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationValidator();

        // Factory should create declarations for all criteria, saving them to applicant.
        $completeApplication = factory(JobApplication::class)->state('submitted')->create([
        'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $this->assertTrue($validator->essentialSkillsComplete($completeApplication));
        $this->assertTrue($validator->assetSkillsComplete($completeApplication));

        // Ensure validation also works correctly for drafts
        // (because in drafts, application, instead of applicANT, skills are validated).
        $completeDraft = factory(JobApplication::class)->state('draft')->create([
        'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeDraft);
        $this->assertTrue($validator->essentialSkillsComplete($completeDraft));
        $this->assertTrue($validator->assetSkillsComplete($completeDraft));

        // Missing skills should make it invalid.
        $missingSkills = factory(JobApplication::class)->state('draft')->create([
        'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($missingSkills);
        $applicant->skill_declarations()->delete();
        $this->assertFalse($validator->essentialSkillsComplete($missingSkills));
        $this->assertFalse($validator->assetSkillsComplete($missingSkills));

        // An incomplete skill declaration should make it invalid.
        $incompleteSkills = factory(JobApplication::class)->state('draft')->create([
        'applicant_id' => $applicant->id
        ]);
        $essentialCriteria = $incompleteSkills->job_poster->criteria->where('criteria_type.name', 'essential')->first();
        $assetCriteria = $incompleteSkills->job_poster->criteria->where('criteria_type.name', 'asset')->first();
        $essentialDec = $applicant->skill_declarations->where('skill_id', $essentialCriteria->skill_id)->first();
        $assetDec = $applicant->skill_declarations->where('skill_id', $assetCriteria->skill_id)->first();
        $essentialDec->description = null;
        $assetDec->description = '';
        $essentialDec->save();
        $assetDec->save();
        $this->assertFalse($validator->essentialSkillsComplete($incompleteSkills->fresh()));
        $this->assertFalse($validator->assetSkillsComplete($incompleteSkills->fresh()));
    }

    public function testAffirmationComplete(): void
    {
        $validator = new ApplicationValidator();

        $application = factory(JobApplication::class)->create([
        'submission_signature' => '',
        'submission_date' => '2019-11-19'
        ]);
        $this->assertFalse($validator->affirmationComplete($application));

        $completeApp = factory(JobApplication::class)->create([
        'submission_signature' => $this->faker->name(),
        'submission_date' => '1995-05-05'
        ]);
        $this->assertTrue($validator->affirmationComplete($completeApp));
    }

    public function testCombinedValidator(): void
    {
        $validator = new ApplicationValidator();

        $submitted = factory(JobApplication::class)->state('submitted')->create();
        $this->assertTrue($validator->validateComplete($submitted));

        $completeDraft = factory(JobApplication::class)->state('draft')->create([
            'submission_signature' => $this->faker->name(),
            'submission_date' => '2019-06-06',
        ]);
        $this->assertTrue($validator->validateComplete($completeDraft));


        // Having any of the steps incomplete should invalidate the whole app
        $basicIncomplete = factory(JobApplication::class)->create([
            'veteran_status_id' => null,
        ]);
        $this->assertFalse($validator->validateComplete($basicIncomplete));

        $essentialIncomplete = factory(JobApplication::class)->state('draft')->create();
        $essentialIncomplete->applicant->skill_declarations()->delete();
        $this->assertFalse($validator->validateComplete($essentialIncomplete));

        $affirmationIncomplete = factory(JobApplication::class)->create([
            'submission_signature' => '',
        ]);
        $this->assertFalse($validator->validateComplete($affirmationIncomplete));
    }
}
