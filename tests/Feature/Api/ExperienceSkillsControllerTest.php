<?php

namespace Tests\Feature\Api;

use App\Models\Applicant;
use App\Models\ExperienceAward;
use App\Models\ExperiencePersonal;
use App\Models\ExperienceSkill;
use App\Models\ExperienceWork;
use App\Models\Skill;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ExperienceSkillsControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function makeExpSkillData($experienceId, $experienceType)
    {
        $faker = \Faker\Factory::create();
        return [
            'experience_id' => $experienceId,
            'experience_type' => $experienceType,
            'justification' => $faker->paragraph(),
            'skill_id' => Skill::inRandomOrder()->first()->id,
        ];
    }

    public function testCreateExperienceSkill()
    {
        $work = factory(ExperienceWork::class)->create();
        $workSkillData = $this->makeExpSkillData($work->id, 'experience_work');
        $response = $this->actingAs($work->experienceable->user)
            ->json('post', route('api.v1.experience-skill.store'), $workSkillData);
        $response->assertOk();
        $response->assertJsonFragment($workSkillData);
        $id = $response->decodeResponseJson('id');
        $this->assertDatabaseHas(
            'experience_skills',
            array_merge(
                ['id' => $id],
                $workSkillData
            )
        );
    }

    public function testCreateExperienceSkillWithWrongUser()
    {
        $applicant = factory(Applicant::class)->create();
        $otherApplicant = factory(Applicant::class)->create();
        $award = factory(ExperienceAward::class)->create([
            'experienceable_id' => $applicant->id,
            'experienceable_type' => 'applicant'
        ]);
        $otherAward = factory(ExperienceAward::class)->create([
            'experienceable_id' => $otherApplicant->id,
            'experienceable_type' => 'applicant'
        ]);

        $awardSkillData = $this->makeExpSkillData($award->id, 'experience_award');
        $response = $this->actingAs($otherApplicant->user)->json('post', route('api.v1.experience-skill.store'), $awardSkillData);
        $response->assertForbidden();

        $response = $this->actingAs($applicant->user)->json('post', route('api.v1.experience-skill.store'), $awardSkillData);
        $response->assertOk();
    }

    public function testUpdateExperienceSkill()
    {
        $experienceSkill = factory(ExperienceSkill::class)->create();
        $updateData = $this->makeExpSkillData(0, '');
        $response = $this->actingAs($experienceSkill->experience->experienceable->user)
            ->json('put', route('api.v1.experience-skill.update', $experienceSkill->id), $updateData);
        $response->assertOk();
        // Note: when updating, only the justification should be modifiable. The other fields will be ignored.
        // Note: also, the updated_at date will be now be newer
        $expectData = array_merge(
            collect($experienceSkill->attributesToArray())->forget(['justification', 'updated_at'])->all(),
            ['justification' => $updateData['justification']]
        );
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experience_skills', $expectData);
    }

    public function testDeleteExperienceSkill()
    {
        $experienceSkill = factory(ExperienceSkill::class)->create();
        $response = $this->actingAs($experienceSkill->experience->experienceable->user)
            ->json('delete', route('api.v1.experience-skill.destroy', $experienceSkill->id));
        $response->assertOk();
        // Note: when updating, only the justification should be modifiable. The other fields will be ignored.
        $this->assertDatabaseMissing(
            'experience_skills',
            ['id' => $experienceSkill->id]
        );
    }
}
