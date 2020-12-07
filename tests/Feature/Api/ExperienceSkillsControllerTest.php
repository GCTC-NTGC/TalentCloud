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
use Illuminate\Support\Facades\Log;

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
        $this->assertSoftDeleted(
            'experience_skills',
            ['id' => $experienceSkill->id]
        );
    }

    public function testRestoreSoftDeletedExperienceSkill()
    {
        $faker = \Faker\Factory::create();
        $experienceSkill = factory(ExperienceSkill::class)->create([
            'deleted_at' => $faker->dateTimeBetween('yesterday', 'tomorrow')->format('Y-m-d H:i:s')
        ]);
        // Assert that the experience skill has been soft deleted
        $this->assertSoftDeleted(
            'experience_skills',
            ['id' => $experienceSkill->id]
        );

        // If a soft deleted experience skill already exists,
        // restore that experience skill instead of creating a new one.
        $experienceSkillData = [
            'skill_id' => $experienceSkill->skill_id,
            'experience_id' => $experienceSkill->experience_id,
            'experience_type' => $experienceSkill->experience_type,
            'justification' => $experienceSkill->justification,
        ];
        $response = $this->actingAs($experienceSkill->experience->experienceable->user)
            ->json('post', route('api.v1.experience-skill.store'), $experienceSkillData);
        $response->assertOk();
        $this->assertDatabaseHas(
            'experience_skills',
            ['id' => $experienceSkill->id, 'deleted_at' => null]
        );
    }

    public function testBatchStoreExperienceSkill()
    {
        $work = factory(ExperienceWork::class)->create();
        $workExperienceSkills = [
            $this->makeExpSkillData($work->id, 'experience_work'),
            $this->makeExpSkillData($work->id, 'experience_work'),
            $this->makeExpSkillData($work->id, 'experience_work'),
        ];
        $response = $this->actingAs($work->experienceable->user)
            ->json('post', route('api.v1.experience-skill.batch-store'), $workExperienceSkills);
        $response->assertOk();
        $response->assertJson($workExperienceSkills);
        $ids = $response->decodeResponseJson('*.id');
        $this->assertDatabaseHas(
            'experience_skills',
            [
                'id' => $ids[0],
                'id' => $ids[1],
                'id' => $ids[2],
            ]
        );
    }

    public function testBatchUpdateExperienceSkill()
    {
        $faker = \Faker\Factory::create();
        $work = factory(ExperienceWork::class)->create();
        $experienceSkill1 = factory(ExperienceSkill::class)->create([
            'experience_id' => $work->id,
            'experience_type' => 'experience_work',
            'skill_id' => 1,
        ]);
        $experienceSkill2 = factory(ExperienceSkill::class)->create([
            'experience_id' => $work->id,
            'experience_type' => 'experience_work',
            'skill_id' => 2,
        ]);

        $updateData = [
            [ 'id' => $experienceSkill1->id, 'justification' => $faker->paragraph()],
            [ 'id' => $experienceSkill2->id, 'justification' => $faker->paragraph()],
        ];
        $response = $this->actingAs($work->experienceable->user)
            ->json('post', route('api.v1.experience-skill.batch-update'), $updateData);
        $response->assertOk();
        // Note: when updating, only the justification should be modifiable. The other fields will be ignored.
        // Note: also, the updated_at date will be now be newer
        $expectData = array_merge(
            collect($experienceSkill1->attributesToArray())->forget(['justification', 'updated_at'])->all(),
            ['justification' => $updateData[0]['justification']],
            collect($experienceSkill2->attributesToArray())->forget(['justification', 'updated_at'])->all(),
            ['justification' => $updateData[1]['justification']]
        );
        $response->assertJsonFragment($expectData);
        $this->assertDatabaseHas('experience_skills', $expectData);
    }

    public function testBatchDeleteExperienceSkill()
    {
        $work = factory(ExperienceWork::class)->create();
        $experienceSkill1 = factory(ExperienceSkill::class)->create([
            'experience_id' => $work->id,
            'experience_type' => 'experience_work',
            'skill_id' => 1,
        ]);
        $experienceSkill2 = factory(ExperienceSkill::class)->create([
            'experience_id' => $work->id,
            'experience_type' => 'experience_work',
            'skill_id' => 2,
        ]);

        $experienceSkills = [
            ['id' => $experienceSkill1->id ],
            ['id' => $experienceSkill2->id ],
        ];
        $response = $this->actingAs($work->experienceable->user)
            ->json('post', route('api.v1.experience-skill.batch-destroy'), $experienceSkills);
        $response->assertOk();

        $this->assertSoftDeleted(
            'experience_skills',
            [
                'id' => $experienceSkill1->id,
                'id' => $experienceSkill2->id
            ]
        );

        // If a soft deleted experience skill already exists,
        // restore that experience skill instead of creating a new one.
        $workExperienceSkills = [
            $experienceSkill1->attributesToArray(),
            $experienceSkill2->attributesToArray(),
        ];
        $response = $this->actingAs($work->experienceable->user)
            ->json('post', route('api.v1.experience-skill.batch-store'), $workExperienceSkills);
        $response->assertOk();
        $this->assertDatabaseHas(
            'experience_skills',
            ['id' => $experienceSkill1->id, 'deleted_at' => null]
        );
        $this->assertDatabaseHas(
            'experience_skills',
            ['id' => $experienceSkill2->id, 'deleted_at' => null]
        );
    }
}
