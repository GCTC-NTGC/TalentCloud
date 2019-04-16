<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Lang;
use App\Models\Applicant;
use App\Models\Reference;
use App\Models\Lookup\Relationship;

class ReferencesControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Run parent setup and provide reusable factories.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        $this->applicant = factory(Applicant::class)->create();
    }

    /**
     * Ensure an applicant can view their own references.
     *
     * @return void
     */
    public function testViewEditForm(): void
    {
        // Save several references to applicant
        $this->applicant->references()->saveMany(factory(Reference::class, 3)->create([
            'applicant_id' => $this->applicant->id
        ]));

        $response = $this->actingAs($this->applicant->user)
            ->get(route('profile.references.edit', $this->applicant->id));
        $response->assertStatus(200);
        $response->assertSee(e(Lang::get('applicant/profile_references.reference_section.section_description')));

        foreach ($this->applicant->references as $reference) {
            $response->assertSee($reference->name);
        }
    }

    /**
     * Ensure the \profile\references url redirects to the Edit References page
     * for an authenticated applicant.
     *
     * @return void
     */
    public function testEditAuthenticated(): void
    {
        $response = $this->actingAs($this->applicant->user)->get('profile/references');
        $response->assertRedirect(route('profile.references.edit', $this->applicant->id));
    }

    /**
     * Ensure an unauthenticated user cannot view an applicant's references
     *
     * @return void
     */
    public function testGuestCannotViewReferences(): void
    {
        $response = $this->get(route('profile.references.edit', $this->applicant->id));
        $response->assertRedirect(route('login'));
    }

    /**
     * Ensure an applicant cannot view a different applicant's references
     *
     * @return void
     */
    public function testApplicantCannotViewAnothersReferences(): void
    {
        $otherUser = factory(Applicant::class)->create()->user;
        $response = $this->actingAs($otherUser)->get(route('profile.references.edit', $this->applicant->id));
        $response->assertStatus(403);
    }

    /**
     * Create an input array like what would come from the Edit Reference form.
     *
     * @return mixed
     */
    protected function makeReferenceForm()
    {
        $faker = \Faker\Factory::create();
        $projects = [];
        for ($i=0; $i<3; $i++) {
            $projects[] = [
                'name' => $faker->sentence(),
                'start_date' => $faker->dateTimeBetween('-3 years', '-1 years')->format("Y-m-d"),
                'end_date' => $faker->dateTimeBetween('-1 years', '-1 day')->format("Y-m-d")
            ];
        }
        return [
            'name' => $faker->name(),
            'email' => $faker->safeEmail(),
            'description' => $faker->paragraphs(2, true),
            'relationship_id' => Relationship::inRandomOrder()->first()->id,
            'projects' => $projects,
        ];
    }

    /**
     * Ensure applicant can create new Reference
     *
     * @return void
     */
    public function testCreateReference(): void
    {
        $input = $this->makeReferenceForm();
        $response = $this->actingAs($this->applicant->user)->json("POST", "references", $input);
        $refDb = collect($input)->forget("projects")->toArray();
        $refDb['applicant_id'] = $this->applicant->id;
        $this->assertDatabaseHas('references', $refDb);
        foreach ($input['projects'] as $project) {
            $project['applicant_id'] = $this->applicant->id;
            $this->assertDatabaseHas('projects', $project);
        }
    }

    /**
     * Ensure applicant can update old Reference
     *
     * @return void
     */
    public function testUpdateReference(): void
    {
        $ref = factory(Reference::class)->create(['applicant_id' => $this->applicant->id]);
        $oldProjects = $ref->projects;
        $input = $this->makeReferenceForm();
        $response = $this->actingAs($this->applicant->user)->json("PUT", "references/$ref->id", $input);
        $refDb = collect($input)->forget("projects")->toArray();
        $refDb['id'] = $ref->id;
        $refDb['applicant_id'] = $this->applicant->id;
        // Ensure reference with same id but new values exists in db
        $this->assertDatabaseHas('references', $refDb);
        // Ensure projects submitted in new request all exist
        foreach ($input['projects'] as $project) {
            $project['applicant_id'] = $this->applicant->id;
            $this->assertDatabaseHas('projects', $project);
        }
        // Ensure old projects have been deleted
        foreach ($oldProjects as $project) {
            $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        }
    }

    /**
     * Ensure applicant can delete old Reference
     *
     * @return void
     */
    public function testDeleteReference(): void
    {
        $ref = factory(Reference::class)->create(['applicant_id' => $this->applicant->id]);
        $oldProjects = $ref->projects;
        $input = $this->makeReferenceForm();
        $response = $this->actingAs($this->applicant->user)->json("DELETE", "references/$ref->id");
        $this->assertDatabaseMissing('references', ["id" => $ref->id]);
        // Ensure projects have been deleted along with reference
        foreach ($oldProjects as $project) {
            $this->assertDatabaseMissing('projects', ['id' => $project->id]);
        }
    }
}
