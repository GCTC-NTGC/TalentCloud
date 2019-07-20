<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\JobPoster;
use App\Models\Criteria;

class CriteriaControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     *  Converts a Criteria to shape sent and received through the api.
    *
    * @var callable
    */
    protected $toApiArray;

    /**
     * Run parent setup and create helper function.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->toApiArray = function ($model) {
            return array_merge($model->toArray(), $model->getTranslationsArray());
        };
    }

    public function testIndexByJob()
    {
        $job = factory(JobPoster::class)->state('published')->create();
        // Ensure the factory added criteria, so we're not just checking an empty array
        $this->assertNotEmpty($job->criteria);

        $expected = $job->criteria->map($this->toApiArray)->toArray();
        $response = $this->json('get', "api/jobs/$job->id/criteria");
        $response->assertOk();
        $response->assertJson($expected);
    }

    public function testBatchUpdateAddsCriteria()
    {
        $job = factory(JobPoster::class)->create();
        $job->criteria()->delete(); // Clear criteria, to start from clean slate


        $newCriteria = factory(Criteria::class, 3)->make(['job_poster_id' => $job->id]);
        $newCriteriaArray = collect($newCriteria)->map($this->toApiArray);
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/criteria", $newCriteriaArray->toArray());
        $response->assertOk();

        foreach ($newCriteriaArray as $criteria) {
            $this->assertDatabaseHas(
                'criteria',
                [
                    'job_poster_id' => $job->id,
                    'criteria_type_id' => $criteria['criteria_type_id'],
                    'skill_id' => $criteria['skill_id'],
                    'skill_level_id' => $criteria['skill_level_id'],
                ]
            );
            $this->assertDatabaseHas(
                'criteria_translations',
                [
                    'locale' => 'en',
                    'description' => $criteria['en']['description'],
                    'specificity' => $criteria['en']['specificity'],
                ]
            );
            $this->assertDatabaseHas(
                'criteria_translations',
                [
                    'locale' => 'fr',
                    'description' => $criteria['fr']['description'],
                    'specificity' => $criteria['fr']['specificity'],
                ]
            );
        }
    }

    public function testBatchUpdateRemovesCriteria()
    {
        $job = factory(JobPoster::class)->create();
        $job->criteria()->delete(); // Clear criteria, to start from clean slate

        $criteria = factory(Criteria::class, 2)->create(['job_poster_id' => $job->id]);
        $criteria0 = $criteria[0];
        $criteria1 = $criteria[1];
        // A new criteria, not yet saved to database
        $criteria2 = factory(Criteria::class)->make(['job_poster_id' => $job->id]);

        $newCriteriaArray = collect([$criteria1, $criteria2])->map($this->toApiArray); // The updated criteria don't include criteria0
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/criteria", $newCriteriaArray->toArray());
        $response->assertOk();

        // criteria1 should be present, unchanged
        $this->assertNotNull(Criteria::find($criteria1->id));
        $newData = $newCriteriaArray[0];
        $this->assertDatabaseHas(
            'criteria',
            [
                'id' => $newData['id'],
                'job_poster_id' => $job->id,
                'criteria_type_id' => $newData['criteria_type_id'],
                'skill_id' => $newData['skill_id'],
                'skill_level_id' => $newData['skill_level_id'],
            ]
        );
        $this->assertDatabaseHas(
            'criteria_translations',
            [
                'locale' => 'en',
                'criteria_id' => $newData['id'],
                'description' => $newData['en']['description'],
                'specificity' => $newData['en']['specificity'],
            ]
        );
        $this->assertDatabaseHas(
            'criteria_translations',
            [
                'locale' => 'fr',
                'criteria_id' => $newData['id'],
                'description' => $newData['fr']['description'],
                'specificity' => $newData['fr']['specificity'],
            ]
        );

        // criteria0 should be deleted
        $this->assertNull(Criteria::find($criteria0->id));
        $this->assertDatabaseMissing(
            'criteria_translations',
            [
                'locale' => 'en',
                'description' => $criteria0->translate('en')->description,
                'specificity' => $criteria0->translate('en')->specificity,
            ]
        );
        $this->assertDatabaseMissing(
            'criteria_translations',
            [
                'locale' => 'fr',
                'description' => $criteria0->translate('fr')->description,
                'specificity' => $criteria0->translate('fr')->specificity,
            ]
        );
    }

    public function testBatchUpdateUpdatesCriteria()
    {
        $job = factory(JobPoster::class)->create();
        $job->criteria()->delete(); // Clear criteria, to start from clean slate

        $criteria0 = factory(Criteria::class)->create(['job_poster_id' => $job->id]);
        $newData = [
            'id' => $criteria0->id,
            'job_poster_id' => $job->id,
            'skill_id' => 10,
            'skill_level_id' => 2,
            'criteria_type_id' => 1,
            'en' => ['description' => 'This is the new description', 'specificity' => 'With extra specificity'],
            'fr' => ['description' => null, 'specificity' => null],
        ];
        $newCriteriaArray = [
            $newData,
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/criteria", $newCriteriaArray);
        $response->assertOk();

        // criteria0 should be present, but with updated description
        $this->assertNotNull(Criteria::find($criteria0->id));
        $this->assertDatabaseHas(
            'criteria',
            [
                'id' => $newData['id'],
                'job_poster_id' => $job->id,
                'criteria_type_id' => $newData['criteria_type_id'],
                'skill_id' => $newData['skill_id'],
                'skill_level_id' => $newData['skill_level_id'],
            ]
        );
        $this->assertDatabaseHas(
            'criteria_translations',
            [
                'locale' => 'en',
                'criteria_id' => $newData['id'],
                'description' => $newData['en']['description'],
                'specificity' => $newData['en']['specificity'],
            ]
        );
        $this->assertDatabaseHas(
            'criteria_translations',
            [
                'locale' => 'fr',
                'criteria_id' => $newData['id'],
                'description' => $newData['fr']['description'],
                'specificity' => $newData['fr']['specificity'],
            ]
        );
    }

    public function testBatchUpdateAddsCriteriaWithEmptyOrStringIds()
    {
        $job = factory(JobPoster::class)->create();
        $job->criteria()->delete(); // Clear criteria, to start from clean slate

        $criteria0 =  [
            'id' => null,
            'job_poster_id' => $job->id,
            'skill_id' => 10,
            'skill_level_id' => 2,
            'criteria_type_id' => 1,
            'en' => ['description' => 'Description 0', 'specificity' => 'Specificity 0'],
            'fr' => ['description' => null, 'specificity' => null],
        ];
        $criteria1 = [
            'id' => 'temp-1',
            'job_poster_id' => $job->id,
            'skill_id' => 5,
            'skill_level_id' => 3,
            'criteria_type_id' => 2,
            'en' => ['description' => 'Description 1', 'specificity' => 'Specificity 1'],
            'fr' => ['description' => null, 'specificity' => null],
        ];


        $newCriteriaArray = [$criteria0, $criteria1];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/criteria", $newCriteriaArray);
        $response->assertOk();

        // criteria0 and criteria0 should both be added
        foreach ($newCriteriaArray as $criteria) {
            $this->assertDatabaseHas(
                'criteria',
                [
                    'job_poster_id' => $job->id,
                    'criteria_type_id' => $criteria['criteria_type_id'],
                    'skill_id' => $criteria['skill_id'],
                    'skill_level_id' => $criteria['skill_level_id'],
                ]
            );
            $this->assertDatabaseHas(
                'criteria_translations',
                [
                    'locale' => 'en',
                    'description' => $criteria['en']['description'],
                    'specificity' => $criteria['en']['specificity'],
                ]
            );
            $this->assertDatabaseHas(
                'criteria_translations',
                [
                    'locale' => 'fr',
                    'description' => $criteria['fr']['description'],
                    'specificity' => $criteria['fr']['specificity'],
                ]
            );
        }
    }

    public function testBatchUpdateCreatesNotifications()
    {
        $job = factory(JobPoster::class)->create();
        $job->criteria()->delete(); // Clear criteria, to start from clean slate

        // Create 3 criteria. We will update one, delete one, and update only the description of the third
        $criteria1 = factory(Criteria::class)->create(['job_poster_id' => $job->id, 'skill_id' => 1]);
        $criteria2 = factory(Criteria::class)->create(['job_poster_id' => $job->id]);
        $criteria3 = factory(Criteria::class)->create(['job_poster_id' => $job->id]);
        // We totally update criteria1
        $updatedData1 = [
            'id' => $criteria1->id,
            'job_poster_id' => $job->id,
            'skill_id' => 10, // This is defintely different
            'skill_level_id' => 2,
            'criteria_type_id' => 1,
            'en' => ['description' => 'This is the new description', 'specificity' => 'With extra specificity'],
            'fr' => ['description' => null, 'specificity' => null],
        ];
        // criteria2 will be ommitted from the batch update and be deleted
        // criteria3 will be updated, but only in its description
        $updatedData3 = [
            'id' => $criteria3->id,
            'job_poster_id' => $job->id,
            'skill_id' => $criteria3->skill_id,
            'skill_level_id' => $criteria3->skill_level_id,
            'criteria_type_id' => 1,
            'en' => ['description' => 'Only the description of this criteria is changing.', 'specificity' => 'Okay the specificity is changing too.'],
            'fr' => ['description' => null, 'specificity' => null],
        ];
        // We also create a brand new criteria
        $newData = [
            'id' => 'temp-4',
            'job_poster_id' => $job->id,
            'skill_id' => 3,
            'skill_level_id' => 2,
            'criteria_type_id' => 1,
            'en' => ['description' => 'This one is new.', 'specificity' => 'Super new.'],
            'fr' => ['description' => null, 'specificity' => null],
        ];



        $newCriteriaArray = [
            $updatedData1,
            $updatedData3,
            $newData
        ];
        $response = $this->actingAs($job->manager->user)
            ->json('put', "api/jobs/$job->id/criteria", $newCriteriaArray);
        $response->assertOk();

        // criteria1 should have created an update notification
        $notificationValues1 = [
            'type' => 'UPDATE',
            'criteria_id' => $criteria1->id,
            'job_poster_id' => $job->id,
            'criteria_type_id' => $criteria1->criteria_type_id,
            'skill_id' => $criteria1->skill_id,
            'skill_id_new' => $updatedData1['skill_id'],
            'skill_level_id' => $criteria1->skill_level_id,
            'skill_level_id_new' => $updatedData1['skill_level_id'],
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues1);

        // criteria2 should have generated a delete notification
        $notificationValues2 = [
            'type' => 'DELETE',
            'criteria_id' => $criteria2->id,
            'job_poster_id' => $job->id,
            'criteria_type_id' => $criteria2->criteria_type_id,
            'skill_id' => $criteria2->skill_id,
            'skill_id_new' => null,
            'skill_level_id' => $criteria2->skill_level_id,
            'skill_level_id_new' => null,
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues2);

        // criteria3 should have NOT generated a notification, as only the description changed
        $notificationValues3 = [
            'type' => 'UPDATE',
            'criteria_id' => $criteria3->id,
        ];
        $this->assertDatabaseMissing('assessment_plan_notifications', $notificationValues3);

        // newData should have generated a CREATE notification
        $notificationValues4 = [
            'type' => 'CREATE',
            'job_poster_id' => $job->id,
            'criteria_type_id' => $newData['criteria_type_id'],
            'skill_id' => $newData['skill_id'],
            'skill_id_new' => null,
            'skill_level_id' => $newData['skill_level_id'],
            'skill_level_id_new' => null,
            'acknowledged' => false
        ];
        $this->assertDatabaseHas('assessment_plan_notifications', $notificationValues4);
    }
}
