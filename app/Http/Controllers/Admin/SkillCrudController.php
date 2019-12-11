<?php

namespace App\Http\Controllers\Admin;

// Validation.
use App\Http\Requests\SkillCrudRequest as StoreRequest;
use App\Http\Requests\SkillCrudRequest as UpdateRequest;
use App\Models\Classification;
use App\Models\Lookup\SkillType;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class SkillCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        // Eloquent model to associate with this collection
        // of views and controller actions.
        $this->crud->setModel('App\Models\Skill');
        // Custom backpack route.
        $this->crud->setRoute('admin/skill');
        // Custom strings to display within the backpack UI,
        // things like Create Skill, Delete Skills, etc.
        $this->crud->setEntityNameStrings('skill', 'skills');

        $this->crud->operation(['create', 'update'], function(){
            // Add custom fields to the create/update views.
            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
            ]);

            $this->crud->addField([
                'name' => 'description',
                'type' => 'textarea',
                'label' => 'Description',
                'limit' => 70,
            ]);

            $this->crud->addField([
                'name' => 'skill_type_id',
                'label' => 'Type',
                'type' => 'select_from_array',
                'options' => SkillType::all()->pluck('name', 'id')->toArray(),
                'allow_null' => false,
            ]);

            $this->crud->addField([
                'name' => 'classifications',
                'type' => 'select2_multiple',
                'label' => 'Classifications (select all that apply)',
                'entity' => 'skills',
                'attribute' => 'key',
                'model' => 'App\Models\Classification',
                'pivot' => true,
            ]);

            $this->crud->addField([
                'name' => 'is_culture_skill',
                'label' => 'This is a culture skill',
                'type' => 'checkbox'
            ]);

            $this->crud->addField([
                'name' => 'is_future_skill',
                'label' => 'This is a future skill',
                'type' => 'checkbox'
            ]);
        });
    }

    public function setupListOperation()
    {
        // Workaround for how the unique_translation validation
        // works in App\Http\Requests\SkillCrudRequest.
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Remove delete button.
        $this->crud->removeButton('delete');

        // Add custom columns to the Skill index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'searchLogic' => function($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('name->' . $locale, 'like', "%$searchTerm%");
            },
            'orderLogic' => function($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            }
        ]);

        $this->crud->addColumn([
            'name' => 'description',
            'type' => 'text',
            'label' => 'Description',
            'searchLogic' => function($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('description->' . $locale, 'like', "%$searchTerm%");
            },
            'orderable' => false,
        ]);

        $this->crud->addColumn([
            'name' => 'skill_type.name',
            'key' => 'skill_type_name',
            'type' => 'text',
            'label' => 'Type',
            'orderable' => true,
            'orderLogic' => function($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('skill_type_id', $columnDirection)->select('*');
            }
        ]);

        $this->crud->addColumn([
            'label' => 'Classifications',
            'type' => 'select_multiple',
            'name' => 'classifications',
            'entity' => 'classifications',
            'attribute' => 'key',
            'model' => 'App\Models\Skill',
        ]);

        $this->crud->addColumn([
            'name' => 'is_culture_skill',
            'label' => 'Culture',
            'type' => 'boolean',
            'orderable' => true,
        ]);

        $this->crud->addColumn([
            'name' => 'is_future_skill',
            'label' => 'Future',
            'type' => 'boolean',
            'orderable' => true,
        ]);

        // Add select2_multiple filter for classifications.
        $this->crud->addFilter([
            'name' => 'classifications',
            'key' => 'classifications_filter',
            'type' => 'select2_multiple',
            'label' => 'Filter by classification'
        ], function(){
            // The options that show up in the select2.
            return Classification::all()->pluck('key', 'id')->toArray();
        }, function($values){
            // If the filter is active.
            foreach (json_decode($values) as $key => $value) {
                $this->crud->query = $this->crud->query->whereHas('classifications', function($query) use ($value) {
                    $query->where('id', $value);
                });
            }
        });

        // Add filter for skills without classifications.
        $this->crud->addFilter(
            [
                'type' => 'simple',
                'name' => 'noClassification',
                'label'=> 'No classification'
            ],
            false,
            function(){
                $this->crud->query = $this->crud->query->doesntHave('classifications');
            }
        );
    }

    public function setupCreateOperation()
    {
        $this->crud->setValidation(StoreRequest::class);
    }

    public function setupUpdateOperation()
    {
        $this->crud->setValidation(UpdateRequest::class);
    }
}
