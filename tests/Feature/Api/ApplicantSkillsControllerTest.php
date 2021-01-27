<?php

namespace Tests\Feature\Api;

use App\Models\Applicant;
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
    }
}
