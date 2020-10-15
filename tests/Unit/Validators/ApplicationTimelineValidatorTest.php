<?php

namespace Tests\Unit\Validators;

use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperienceCommunity;
use App\Models\ExperienceEducation;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\JobPoster;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\LanguageRequirement;
use App\Services\Validation\ApplicationTimelineValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApplicationTimelineValidatorTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Live posters required to apply to.
        $this->livePoster = factory(JobPoster::class)
            ->states('live')
            ->create();

        // New Applications should be using version 2.
        $this->application = factory(JobApplication::class)
            ->states('draft')
            ->create([
                'job_poster_id' => $this->livePoster->id,
                'version_id' => 2,
            ]);

        // Generate some experiences to test against.
        $this->experiences = array(
            factory(ExperienceWork::class)
                ->create([
                    'experienceable_id' => $this->application->id,
                    'experienceable_type' => 'application',
                ]),
            factory(ExperiencePersonal::class)
                ->create([
                    'experienceable_id' => $this->application->id,
                    'experienceable_type' => 'application',
                ]),
            factory(ExperienceEducation::class)
                ->create([
                    'experienceable_id' => $this->application->id,
                    'experienceable_type' => 'application',
                ]),
            factory(ExperienceCommunity::class)
                ->create([
                    'experienceable_id' => $this->application->id,
                    'experienceable_type' => 'application',
                ]),
            factory(ExperienceAward::class)
                ->create([
                    'experienceable_id' => $this->application->id,
                    'experienceable_type' => 'application',
                ]),
        );

        // Get the essential criteria from the generated Job Poster.
        // Validation currently only applies to essential Criteria.
        $essentialType = CriteriaType::where('name', 'essential')->first()->id;

        $criteria = $this->livePoster->criteria;
        $essentialCriteria = $criteria->filter(function ($criterion) use ($essentialType) {
            return $criterion->criteria_type_id === $essentialType;
        });

        $this->experienceSkills = array();

        foreach ($essentialCriteria as $essentialCriterion) {
            // Grab a random experience from the factories above.
            $experienceIndex = rand(0, count($this->experiences) - 1);
            // Create a new ExperienceSkill record against each essential Job Criterion.
            $this->experienceSkills[] = factory(ExperienceSkill::class)->create([
                'skill_id' => $essentialCriterion->skill_id,
                'experience_type' => $this->experiences[$experienceIndex]->experienceTypeName(),
                'experience_id' => $this->experiences[$experienceIndex]->id,
            ]);
        }
    }

    public function testBasicsComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationTimelineValidator();

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $job = $completeApplication->job_poster;
        $job->language_requirement_id =
            LanguageRequirement::where('name', 'english')->value('id');
        $job->save();
        $completeApplication->fresh();
        $this->assertTrue($validator->basicsComplete($completeApplication));

        // Unsetting required values should invalidate the basic step.
        $completeApplication->language_requirement_confirmed = false;
        $completeApplication->education_requirement_confirmed = false;
        $completeApplication->save();
        $completeApplication->fresh();
        $this->assertFalse($validator->basicsComplete($completeApplication));

        $completeApplication->language_requirement_confirmed = true;
        $completeApplication->education_requirement_confirmed = true;
        $completeApplication->save();
        $completeApplication->fresh();

        // Poster with bilingual requirement should validate the 'language_test'
        // field.
        $job->language_requirement_id =
            LanguageRequirement::where('name', 'bilingual_intermediate')->value('id');
        $job->save();
        $completeApplication->fresh();
        $this->assertFalse($validator->basicsComplete($completeApplication));
        $completeApplication->language_test_confirmed = true;
        $completeApplication->save();
        $completeApplication->fresh();

        $this->assertTrue($validator->basicsComplete($completeApplication));
    }

    public function testFitComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationTimelineValidator();

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $this->assertTrue($validator->fitComplete($completeApplication));

        // Removing Answers should invalidate basic step.
        $incompleteApplication = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $incompleteApplication->job_application_answers()->delete();
        $this->assertFalse($validator->fitComplete($incompleteApplication));

        // Having one answer empty should invalidate basic step.
        $wrongApp1 = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $answer = $wrongApp1->job_application_answers->first();
        $answer->answer = '';
        $answer->save();
        $this->assertFalse($validator->fitComplete($wrongApp1));

        // Having an extra answer, related to the wrong job, should invalidate.
        $wrongApp2 = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $job2 = factory(JobPoster::class)->create();
        $wrongApp2->job_application_answers()->save(factory(JobApplicationAnswer::class)->create([
            'job_application_id' => $wrongApp2->id,
            'job_poster_question_id' => $job2->job_poster_questions->first()->id
        ]));
        $this->assertFalse($validator->fitComplete($wrongApp2));
    }

    public function testExperienceComplete(): void
    {
        $validator = new ApplicationTimelineValidator();
        // Every essential criterion has an assigned experience above, this should
        // validate.
        $this->assertTrue($validator->experienceComplete($this->application));
        // Removing one or more experiences from a required criterion should fail
        // validation.
        $this->experienceSkills[0]->delete();
        $this->assertFalse($validator->experienceComplete(($this->application)));
    }

    public function testSkillsComplete(): void
    {
        $validator = new ApplicationTimelineValidator();
        // Add a justification to each experience above.
        foreach ($this->experienceSkills as $experience) {
            $experience->justification = $this->faker->text(99);
            $experience->save();
        }
        // Every essential criterion has an assigned experience above, this should
        // validate.
        $this->assertTrue($validator->skillsComplete($this->application));

        // An empty justification should fail validation.
        $this->experienceSkills[0]->justification = null;
        $this->experienceSkills[0]->save();
        $this->assertFalse($validator->skillsComplete($this->application));

        // A justification over 100 characters should fail validation.
        $this->experienceSkills[0]->justification = $this->faker->words(50, true);
        $this->experienceSkills[0]->save();
        $this->assertFalse($validator->skillsComplete($this->application));

        // Removing an experience from a required skill should fail validation.
        $this->experienceSkills[0]->delete();
        $this->assertFalse($validator->skillsComplete($this->application));
    }

    public function testAffirmationComplete(): void
    {
        $validator = new ApplicationTimelineValidator();

        $application = factory(JobApplication::class)->create([
            'submission_signature' => '',
            'submission_date' => '2019-11-19'
        ]);
        $this->assertFalse($validator->affirmationComplete($application));

        $completeApp = factory(JobApplication::class)->create([
            'submission_signature' => $this->faker->name(),
            'submission_date' => '2019-06-06',
        ]);
        $this->assertTrue($validator->affirmationComplete($completeApp));
    }

    public function testCombinedValidator(): void
    {
        $validator = new ApplicationTimelineValidator();
        $submitted = ApplicationStatus::where('name', 'submitted')->first()->id;
        // A completed draft application should validate.
        $this->application->language_test_confirmed = true;
        $this->application->submission_signature = $this->faker->name();
        $this->application->submission_date = '2019-06-06';
        $this->application->save();

        $this->assertTrue($validator->validateComplete($this->application));

        // A completed submitted application should validate.
        $this->application->application_status_id = $submitted;
        $this->application->save();
        $this->assertTrue($validator->validateComplete($this->application));


        // Having any of the steps incomplete should invalidate the whole app.
        $veteranStatus = $this->application->veteran_status_id;
        $this->application->veteran_status_id = null;
        $this->application->save();
        $this->assertFalse($validator->validateComplete($this->application));

        $this->application->veteran_status_id = $veteranStatus;
        $this->application->save();
        $experience = $this->experienceSkills[0];
        $this->experienceSkills[0]->delete();
        $this->assertFalse($validator->validateComplete($this->application));

        $experience->save();
        $this->application->submission_signature = '';
        $this->application->save();
        $this->assertFalse($validator->validateComplete($this->application));
    }
}
