<?php

namespace Tests\Feature\Api;

use App\Models\Applicant;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\Skill;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApplicantSkillsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testGetApplicantSkills(): void
    {
        $applicant = factory(Applicant::class)->create();
        $skills = Skill::inRandomOrder()->limit(5)->get();
        $applicant->skills()->sync($skills->pluck('id'));

        // Assert this is auth protected
        $guestResponse = $this->json('get', route('api.v1.applicant.skills.index', $applicant));
        $guestResponse->assertForbidden();

        $response = $this->actingAs($applicant->user)->json('get', route('api.v1.applicant.skills.index', $applicant));
        $response->assertOk();
        $response->assertJson([
            'skill_ids' => $skills->sortBy('id')->pluck('id')->all()
        ]);
    }

    public function testUpdateApplicantSkills(): void
    {
        $applicant = factory(Applicant::class)->create();

        // Assert this is auth protected
        $guestResponse = $this->json(
            'put',
            route('api.v1.applicant.skills.update', $applicant),
            ['skill_ids' => []]
        );
        $guestResponse->assertForbidden();

        $skillIds = [4,5,10];
        $response = $this->actingAs($applicant->user)->json(
            'put',
            route('api.v1.applicant.skills.update', $applicant),
            ['skill_ids' => $skillIds]
        );
        $response->assertOk();
        $response->assertJson([
            'skill_ids' => $skillIds
        ]);
        $this->assertEquals($skillIds, $applicant->fresh()->skills->pluck('id')->all());

        // Update with new ids, ensure old ones are deleted.
        $newSkillIds = [20,25];
        $response = $this->actingAs($applicant->user)->json(
            'put',
            route('api.v1.applicant.skills.update', $applicant),
            ['skill_ids' => $newSkillIds]
        );
        $response->assertOk();
        $response->assertJson([
            'skill_ids' => $newSkillIds
        ]);
        $this->assertEquals($newSkillIds, $applicant->fresh()->skills->pluck('id')->all());

        // Test that experience skills are deleted when matching Applicant Skills are.
        $workExperience = factory(ExperienceWork::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]);
        $personalExperience = factory(ExperiencePersonal::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant',
        ]);
        $expSkill1 = factory(ExperienceSkill::class)->create([
            'skill_id' => 20,
            'experience_type' => 'experience_work',
            'experience_id' => $workExperience->id
        ]);
        $expSkill2 = factory(ExperienceSkill::class)->create([
            'skill_id' => 25,
            'experience_type' => 'experience_work',
            'experience_id' => $workExperience->id
        ]);
        $expSkill3 = factory(ExperienceSkill::class)->create([
            'skill_id' => 20,
            'experience_type' => 'experience_personal',
            'experience_id' => $personalExperience->id
        ]);
        $expSkill4 = factory(ExperienceSkill::class)->create([
            'skill_id' => 25,
            'experience_type' => 'experience_personal',
            'experience_id' => $personalExperience->id
        ]);

        // If skill 25 is removed from Applicant Skills, expSkills 2 and 4 should be soft deleted.
        $newSkillIds = [20];
        $response = $this->actingAs($applicant->user)->json(
            'put',
            route('api.v1.applicant.skills.update', $applicant),
            ['skill_ids' => $newSkillIds]
        );
        $response->assertOk();
        $this->assertSoftDeleted('experience_skills', ['id' => $expSkill2->id]);
        $this->assertSoftDeleted('experience_skills', ['id' => $expSkill4->id]);
        $this->assertDatabaseHas('experience_skills', [
            'id' => $expSkill1->id,
            'deleted_at' => null,
        ]);
        $this->assertDatabaseHas('experience_skills', [
            'id' => $expSkill3->id,
            'deleted_at' => null,
        ]);

    }
}
