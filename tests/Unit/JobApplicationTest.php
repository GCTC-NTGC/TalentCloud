<?php

namespace Tests\Unit;

use App\Models\Applicant;
use App\Models\Course;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\CriteriaType;
use App\Models\Criteria;
use App\Models\Degree;
use App\Models\ExperienceAward;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\Project;
use App\Models\Reference;
use App\Models\Skill;
use App\Models\SkillDeclaration;
use App\Models\WorkExperience;
use App\Models\WorkSample;
use Illuminate\Support\Collection;

class JobApplicationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that meetsEssentialCriteria functions properly
     *
     * @return void
     */
    public function testMeetsEssentialCriteria(): void
    {
        // Using make avoids creating criteria in factory.
        $jobPoster = factory(JobPoster::class)->states('live')->make();
        $jobPoster->save();

        // Sanity test.
        $this->assertEmpty($jobPoster->criteria);

        $jobPoster->criteria()->save(factory(Criteria::class)->create([
            'criteria_type_id' => CriteriaType::where('name', 'essential')->first()->id,
            'skill_id' => 1,
            'skill_level_id' => 3
        ]));
        $jobPoster->criteria()->save(factory(Criteria::class)->create([
            'criteria_type_id' => CriteriaType::where('name', 'essential')->first()->id,
            'skill_id' => 2,
            'skill_level_id' => 4
        ]));

        // Using make instead of create avoids creating skillDeclarations in factory.
        // This application doesn't have the correct skill declarations.
        $applicationNoSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationNoSkills->save();
        $this->assertFalse($applicationNoSkills->meetsEssentialCriteria());

        // The second skill declaration is too low a skill level.
        $applicationBadSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationBadSkills->save();
        $applicationBadSkills->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3
        ]));
        $applicationBadSkills->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 3,
        ]));
        $this->assertFalse($applicationBadSkills->meetsEssentialCriteria());

        // Both skill declarations meed the required skill level.
        $applicationGoodSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationGoodSkills->save();
        $applicationGoodSkills->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3,
        ]));
        $applicationGoodSkills->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 4,
        ]));
        $this->assertTrue($applicationGoodSkills->meetsEssentialCriteria());

        // Should check applicant profile skills, not application skills, for draft posters.
        // So draft poster with skills, with empty profile, should fail.
        $draftApplicationEmptyProfile = factory(JobApplication::class)->state('draft')->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $draftApplicationEmptyProfile->save();
        $draftApplicationEmptyProfile->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3,
        ]));
        $draftApplicationEmptyProfile->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 4,
        ]));
        $this->assertFalse($draftApplicationEmptyProfile->meetsEssentialCriteria());

        // Should check applicant profile skills, not application skills, for draft posters.
        // So draft poster with no skills, but with skilled applicant profile, should succeed.
        $draftApplication = factory(JobApplication::class)->state('draft')->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $draftApplication->save();
        $draftApplication->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3,
        ]));
        $draftApplication->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 4,
        ]));
        $this->assertTrue($draftApplication->meetsEssentialCriteria());
    }

    /**
     * Assert that $collection contains a single element,
     * and that element is a copy (but not identical) to $target.
     *
     * @param [type]     $target     The thing we expect a copy of.
     * @param Collection $collection Should contain one copy of $target.
     * @return void
     */
    protected function collectionConsistsOfCopy($target, Collection $collection): void
    {
        // There must only be on copy in the collection.
        $this->assertEquals(1, $collection->count());
        $copy = $collection->first();
        // It must have a different id.
        $this->assertNotEquals($target->id, $copy->id);
        // All other fields except created/updated at dates, and ownership fields, must be equal.
        $forgetFields = [
            'id',
            'created_at', 'updated_at',
            'degreeable_type', 'degreeable_id',
            'courseable_type', 'courseable_id',
            'experienceable_type', 'experienceable_id',
            'projectable_type', 'projectable_id',
            'referenceable_type', 'referenceable_id',
            'work_sampleable_type', 'work_sampleable_id',
            'skillable_type', 'skillable_id'
        ];
        $this->assertEquals(
            collect($target->attributesToArray())->except($forgetFields),
            collect($copy->attributesToArray())->except($forgetFields)
        );
    }

    /**
     * Ensure saveProfileSnapshot saves copies of applicant data to application,
     * and that it preserves relationships between copies.
     *
     * @return void
     */
    public function testSaveProfileSnapshot(): void
    {
        $applicant = factory(Applicant::class)->create();
        $applicant->degrees()->save(factory(Degree::class)->create([
            'degreeable_id' => $applicant->id
        ]));
        $applicant->courses()->save(factory(Course::class)->create([
            'courseable_id' => $applicant->id
        ]));
        $applicant->work_experiences()->save(factory(WorkExperience::class)->create([
            'experienceable_id' => $applicant->id
        ]));

        // Use 'make' to avoid running the 'afterCreate' factory function, which creates multiple projects.
        $reference = factory(Reference::class)->make([
            'referenceable_id' => $applicant->id,
        ]);
        $applicant->references()->save($reference);

        $applicant->projects()->save(factory(Project::class)->create([
            'projectable_id' => $applicant->id
        ]));

        $skillDeclaration = factory(SkillDeclaration::class)->create([
            'skillable_id' => $applicant->id
        ]);
        $applicant->skill_declarations()->save($skillDeclaration);

        $applicant->work_samples()->save(factory(WorkSample::class)->create([
            'work_sampleable_id' => $applicant->id
        ]));


        $sample = $applicant->work_samples->first();
        $project = $applicant->projects->first();

        // Link project to reference.
        $reference->projects()->attach($project);

        // Link samples and references to skill declarations.
        $reference->skill_declarations()->attach($skillDeclaration);
        $sample->skill_declarations()->attach($skillDeclaration);

        // Create a new job application.
        // Use 'make' to avoid running the 'afterCreate' factory function, which creates SkillDeclarations.
        $application = factory(JobApplication::class)->make();
        $applicant->job_applications()->save($application);

        $application->saveProfileSnapshot();

        $this->collectionConsistsOfCopy($applicant->degrees->first(), $application->degrees);
        $this->collectionConsistsOfCopy($applicant->courses->first(), $application->courses);
        $this->collectionConsistsOfCopy($applicant->work_experiences->first(), $application->work_experiences);
        $this->collectionConsistsOfCopy($applicant->projects->first(), $application->projects);
        $this->collectionConsistsOfCopy($applicant->references->first(), $application->references);
        $this->collectionConsistsOfCopy($applicant->work_samples->first(), $application->work_samples);
        $this->collectionConsistsOfCopy($applicant->skill_declarations->first(), $application->skill_declarations);

        // Ensure copies are linked to each other just like originals are.
        $refCopy = $application->references->first();
        $projectCopy = $application->projects->first();
        $sampleCopy = $application->work_samples->first();
        $skillCopy = $application->skill_declarations->first();

        $this->assertEquals($refCopy->projects->first()->id, $projectCopy->id);
        $this->assertEquals($refCopy->skill_declarations->first()->id, $skillCopy->id);
        $this->assertEquals($sampleCopy->skill_declarations->first()->id, $skillCopy->id);

        $this->assertEquals($applicant->user->full_name, $application->user_name);
        $this->assertEquals($applicant->user->email, $application->user_email);
    }

    /**
     * Ensure that saveProfileSnapshot doesn't cause many copies to be created if
     * its called multiple times, and that it deletes copies that no longer match an original.
     *
     * @return void
     */
    public function testSaveProfileSnapshotResetEachTime(): void
    {
        $applicant = factory(Applicant::class)->create();
        $applicant->degrees()->save(factory(Degree::class)->create([
            'degreeable_id' => $applicant->id
        ]));

        // Create a new job application.
        // Use 'make' to avoid running the 'afterCreate' factory function, which creates SkillDeclarations.
        $application = factory(JobApplication::class)->make();
        $applicant->job_applications()->save($application);

        $application->saveProfileSnapshot();

        $this->collectionConsistsOfCopy($applicant->fresh()->degrees->first(), $application->fresh()->degrees);

        // Delete applicant degree, and make sure a new snapshot deletes degrees as well.
        $applicant->degrees()->delete();
        $application->saveProfileSnapshot();
        $application->refresh();
        $this->assertEquals(0, $application->fresh()->degrees->count());

        // Add new degree, make sure new snapshot matches it.
        $applicant->degrees()->save(factory(Degree::class)->create([
            'degreeable_id' => $applicant->id
        ]));
        $application->saveProfileSnapshot();
        $this->collectionConsistsOfCopy($applicant->fresh()->degrees->first(), $application->fresh()->degrees);

        // Call saveProfileSnapshot multiple times, ensuring it still only has a single copy of each original.
        $application->saveProfileSnapshot();
        $this->collectionConsistsOfCopy($applicant->fresh()->degrees->first(), $application->fresh()->degrees);
    }

    /**
     * Ensure saveProfileSnapshotTimeline saves copies of applicant data to application,
     * and that it preserves relationships between copies.
     *
     * @return void
    */
    public function testSaveProfileSnapshotTimeline(): void
    {
        $applicant = factory(Applicant::class)->create();

        // Create a new job application.
        $application = factory(JobApplication::class)->states(['draft', 'version2'])->create([
            'applicant_id' => $applicant->id
        ]);

        // Factory automatically creates Experiences and ExperienceSkills, but we want to control them for this test.
        ExperienceSkill::truncate();
        $applicant->experiences_award()->delete();
        $applicant->experiences_work()->delete();

        // Now add one Award and one Work.
        $experience = factory(ExperienceAward::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]);
        $skillLessExperience = factory(ExperienceWork::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]);
        $applicant->refresh();

        // Save an ExperienceSkill for each criteria of the job. (Hard and soft, essential and asset.)
        foreach ($application->job_poster->criteria as $crit) {
            $experienceSkill = factory(ExperienceSkill::class)->create([
                'experience_id' => $experience->id,
                'experience_type' => 'experience_award',
                'skill_id' => $crit->skill_id
            ]);
        }

        $hardCriteria = $application->job_poster->criteria->where('skill.skill_type.name', 'hard');
        $softCriteria = $application->job_poster->criteria->where('skill.skill_type.name', 'soft');

        // Factory should create at least two of each kind of criteria, but double check in case factory is changed:
        $this->assertGreaterThan(1, $hardCriteria->count());
        $this->assertGreaterThan(1, $softCriteria->count());

        // This should copy all Experiences from the applicant, but only ExperienceSkills for hard criteria.
        $application->saveProfileSnapshotTimeline();

        dump(ExperienceWork::all()->toArray());
        dump(ExperienceSkill::all()->toArray());

        $application->refresh();

        $this->collectionConsistsOfCopy($experience, $application->experiences_award);
        $this->collectionConsistsOfCopy($skillLessExperience, $application->experiences_work);

        $experienceAwardCopy = $application->experiences_award()->first();

        // Ensure copies are linked to each other just like originals are.
        // ExperienceSkills for hard skills should have been copied, but not soft skills.
        foreach ($hardCriteria as $crit) {
            $this->assertDatabaseHas('experience_skills', [
                'skill_id' => $crit->skill_id,
                'experience_id' => $experienceAwardCopy->id,
                'experience_type' => 'experience_award'
            ]);
        }
        foreach ($softCriteria as $crit) {
            $this->assertDatabaseMissing('experience_skills', [
                'skill_id' => $crit->skill_id,
                'experience_id' => $experienceAwardCopy->id,
                'experience_type' => 'experience_award'
            ]);
        }
    }

    /**
     * Ensure that saveProfileSnapshot doesn't cause many copies to be created if
     * its called multiple times, and that it deletes copies that no longer match an original.
     *
     * @return void
     */
    public function testSaveProfileSnapshotTimelineResetsEachTime(): void
    {
        $applicant = factory(Applicant::class)->create();
        $experience = factory(ExperienceAward::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]);

        $applicant->experiences_award()->save($experience);

        $experienceSkill = factory(ExperienceSkill::class)->create([
            'experience_id' => $experience->id,
            'experience_type' => 'experience_award',
        ]);

        $experienceAward = $applicant->experiences_award()->first();
        $experienceAward->experience_skills()->save($experienceSkill);

        // Create a new job application.
        $application = factory(JobApplication::class)->make();
        $applicant->job_applications()->save($application);

        $application->saveProfileSnapshotTimeline();

        $this->collectionConsistsOfCopy($applicant->fresh()->experiences_award->first(), $application->fresh()->experiences_award);

        // Delete applicant award experience, and make sure a new snapshot deletes the award experiences as well.
        $applicant->experiences_award()->first()->delete();
        $application->saveProfileSnapshotTimeline();
        $this->assertEquals(0, $application->fresh()->experiences_award->count());
        // Ensure experience_skills were deleted from experience award.
        $this->assertSoftDeleted(
            'experience_skills',
            ['id' => $experienceSkill->id]
        );

        // Add new experience, make sure new snapshot matches it.
        $applicant->experiences_award()->save(factory(ExperienceAward::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]));

        $application->saveProfileSnapshotTimeline();
        $this->collectionConsistsOfCopy(
            $applicant->fresh()->experiences_award->first(),
            $application->fresh()->experiences_award
        );

        // Call saveProfileSnapshotTimeline multiple times, ensuring it still only has a single copy of each original.
        $application->saveProfileSnapshotTimeline();
        $this->collectionConsistsOfCopy(
            $applicant->fresh()->experiences_award->first(),
            $application->fresh()->experiences_award
        );
    }
}
