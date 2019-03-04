<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Lookup\CriteriaType;
use App\Models\Criteria;
use App\Models\JobApplication;
use App\Models\JobPoster;
use App\Models\SkillDeclaration;

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
        //Using make avoids creating criteria in factory
        $jobPoster = factory(JobPoster::class)->states('published')->make();
        $jobPoster->save();

        //Sanity test
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

        //Using make instead of create avoids creating skillDeclarations in factory

        //This application doesn't have the correct skill declarations
        $applicationNoSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationNoSkills->save();
        $this->assertFalse($applicationNoSkills->meetsEssentialCriteria());

        //The second skill declaration is too low a skill level
        $applicationBadSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationBadSkills->save();
        $applicationBadSkills->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3,
            'applicant_id' => $applicationBadSkills->applicant->id,
        ]));
        $applicationBadSkills->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 3,
            'applicant_id' => $applicationBadSkills->applicant->id,
        ]));
        $this->assertFalse($applicationBadSkills->meetsEssentialCriteria());

        //Both skill declarations meed the required skill level
        $applicationGoodSkills = factory(JobApplication::class)->make([
            'job_poster_id' => $jobPoster->id
        ]);
        $applicationGoodSkills->save();
        $applicationGoodSkills->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 1,
            'skill_level_id' => 3,
            'applicant_id' => $applicationGoodSkills->applicant->id,
        ]));
        $applicationGoodSkills->applicant->skill_declarations()->save(factory(SkillDeclaration::class)->create([
            'skill_id' => 2,
            'skill_level_id' => 4,
            'applicant_id' => $applicationGoodSkills->applicant->id,
        ]));
        $this->assertTrue($applicationGoodSkills->meetsEssentialCriteria());


    }
}
