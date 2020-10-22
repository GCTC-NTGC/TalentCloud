<?php

namespace Tests\Unit\Validators;

use App\Models\Applicant;
use App\Models\ExperienceSkill;
use App\Models\JobApplication;
use App\Models\JobApplicationAnswer;
use App\Models\JobPoster;
use App\Models\Lookup\ApplicationStatus;
use App\Models\Lookup\CriteriaType;
use App\Models\Lookup\LanguageRequirement;
use App\Models\Lookup\SkillType;
use App\Services\Validation\ApplicationTimelineValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ApplicationTimelineValidatorTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    public function testBasicsComplete(): void
    {
        $applicant = factory(Applicant::class)->create();
        $validator = new ApplicationTimelineValidator();

        // Factory should create a basics-complete application.
        $completeApplication = factory(JobApplication::class)->states(['draft', 'version2'])->create([
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

        // Factory should create a-complete application.
        $completeApplication = factory(JobApplication::class)->states(['submitted', 'version2'])->create([
            'applicant_id' => $applicant->id
        ]);
        $applicant->job_applications()->save($completeApplication);
        $this->assertTrue($validator->fitComplete($completeApplication));

        // Removing Answers should invalidate fit step.
        $incompleteApplication = factory(JobApplication::class)->states(['submitted', 'version2'])->create([
            'applicant_id' => $applicant->id
        ]);
        $incompleteApplication->job_application_answers()->delete();
        $this->assertFalse($validator->fitComplete($incompleteApplication));

        // Having one answer empty should invalidate fit step.
        $wrongApp1 = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $answer = $wrongApp1->job_application_answers->first();
        $answer->answer = '';
        $answer->save();
        $this->assertFalse($validator->fitComplete($wrongApp1));

        // Having one answer over word count should invalidate fit step.
        $wrongApp1 = factory(JobApplication::class)->create([
            'applicant_id' => $applicant->id
        ]);
        $answer = $wrongApp1->job_application_answers->first();
        $answer->answer = $this->faker->words(255, true);
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
        // Draft Application.
        $draftApplication = factory(JobApplication::class)->states(['draft', 'version2'])->create();
        // Every essential criterion has an assigned experience above, this should
        // validate.
        $this->assertTrue($validator->experienceComplete($draftApplication));
        // Removing one or more experiences from a required criterion should fail
        // validation.
        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;
        $hardSkillType = SkillType::where('name', 'hard')->first()->id;
        $requiredSkill = $draftApplication->job_poster->criteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->first();
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)->delete();
        $this->assertFalse($validator->experienceComplete(($draftApplication)));

        // Submitted Application.
        $submittedApplication = factory(JobApplication::class)->states(['submitted', 'version2'])->create();
        // Every essential criterion has an assigned experience above, this should
        // validate.
        $this->assertTrue($validator->experienceComplete($submittedApplication));
        // Removing one or more experiences from a required criterion should fail
        // validation.
        $requiredSkill = $submittedApplication->job_poster->criteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->first();
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)->delete();
        $this->assertFalse($validator->experienceComplete(($submittedApplication)));
    }

    public function testSkillsComplete(): void
    {
        $validator = new ApplicationTimelineValidator();

        // Draft Application.
        $draftApplication = factory(JobApplication::class)->states(['submitted', 'version2'])->create();
        // Every essential criterion has an assigned experience, this should
        // validate.
        $this->assertTrue($validator->skillsComplete($draftApplication));

        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;
        $hardSkillType = SkillType::where('name', 'hard')->first()->id;
        $requiredSkill = $draftApplication->job_poster->criteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->first();

        // An empty justification should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)
            ->update(['justification' => '']);
        $this->assertFalse($validator->skillsComplete($draftApplication));

        // A justification over 100 characters should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)
            ->update(['justification' => $this->faker->words(105, true)]);
        $this->assertFalse($validator->skillsComplete($draftApplication));

        // Removing an experience from a required skill should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)->delete();
        $this->assertFalse($validator->skillsComplete($draftApplication));

        // Submitted Application.
        $submittedApplication = factory(JobApplication::class)->states(['submitted', 'version2'])->create();
        // Every essential criterion has an assigned experience, this should
        // validate.
        $this->assertTrue($validator->skillsComplete($submittedApplication));

        $requiredSkill = $submittedApplication->job_poster->criteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->first();

        // An empty justification should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)
            ->update(['justification' => '']);
        $this->assertFalse($validator->skillsComplete($submittedApplication));

        // A justification over 100 characters should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)
            ->update(['justification' => $this->faker->words(105, true)]);
        $this->assertFalse($validator->skillsComplete($submittedApplication));

        // Removing an experience from a required skill should fail validation.
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)->delete();
        $this->assertFalse($validator->skillsComplete($submittedApplication));
    }

    public function testAffirmationComplete(): void
    {
        $validator = new ApplicationTimelineValidator();

        $application = factory(JobApplication::class)->states(['draft', 'version2'])->create([
            'submission_signature' => '',
            'submission_date' => '2019-11-19'
        ]);
        $this->assertFalse($validator->affirmationComplete($application));

        $completeApp = factory(JobApplication::class)->states(['submitted', 'version2'])->create([
            'submission_signature' => $this->faker->name(),
            'submission_date' => '2019-06-06',
        ]);
        $this->assertTrue($validator->affirmationComplete($completeApp));
    }

    public function testCombinedValidator(): void
    {
        $validator = new ApplicationTimelineValidator();
        $draftApplication = factory(JobApplication::class)->states(['draft', 'version2'])->create();
        $submitted = ApplicationStatus::where('name', 'submitted')->first()->id;
        $essentialCriteriaType = CriteriaType::where('name', 'essential')->first()->id;
        $hardSkillType = SkillType::where('name', 'hard')->first()->id;
        $requiredSkill = $draftApplication->job_poster->criteria
            ->filter(function ($criterion) use ($essentialCriteriaType, $hardSkillType) {
                return $criterion->criteria_type_id === $essentialCriteriaType
                    && $criterion->skill->skill_type_id === $hardSkillType;
            })
            ->first();
        // A completed draft application should validate.
        $draftApplication->language_test_confirmed = true;
        $draftApplication->submission_signature = $this->faker->name();
        $draftApplication->submission_date = '2019-06-06';
        $draftApplication->save();

        $this->assertTrue($validator->validateComplete($draftApplication));

        // A completed submitted application should validate.
        $draftApplication->application_status_id = $submitted;
        $draftApplication->save();
        $this->assertTrue($validator->validateComplete($draftApplication));


        // Having any of the steps incomplete should invalidate the whole app.
        $veteranStatus = $draftApplication->veteran_status_id;
        $draftApplication->veteran_status_id = null;
        $draftApplication->save();
        $this->assertFalse($validator->validateComplete($draftApplication));

        $draftApplication->veteran_status_id = $veteranStatus;
        $draftApplication->save();
        ExperienceSkill::where('skill_id', $requiredSkill->skill_id)->delete();
        $this->assertFalse($validator->validateComplete($draftApplication));

        $draftApplication->submission_signature = '';
        $draftApplication->save();
        $this->assertFalse($validator->validateComplete($draftApplication));
    }
}
