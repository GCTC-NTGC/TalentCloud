<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;
use App\Models\Lookup\SkillType;
// Validation
use App\Http\Requests\SkillCrudRequest as StoreRequest;
use App\Http\Requests\SkillCrudRequest as UpdateRequest;

class SkillCrudController extends CrudController
{
    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        // Workaround for how the unique_translation validation
        // works in App\Http\Requests\SkillCrudRequest
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Eloquent model to associate with this collection
        // of views and controller actions.
        $this->crud->setModel("App\Models\Skill");
        // Custom backpack route.
        $this->crud->setRoute("admin/skill");
        // Custom strings to display within the backpack UI,
        // things like Create Skill, Delete Skills, etc.
        $this->crud->setEntityNameStrings('Skill', 'Skills');

        // Add custom columns to the Skill index view
        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('name->' . $locale, 'like', "%$searchTerm%");
            },
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            }
        ]);
        $this->crud->addColumn([
            'name' => 'description',
            'type' => 'text',
            'label' => 'Description',
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('description->' . $locale, 'like', "%$searchTerm%");
            },
            'orderable' => false,
        ]);
        $this->crud->addColumn([
            'name' => 'skill_type.name',
            'type' => 'text',
            'label' => 'Type',
            'orderable' => true,
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('skill_type_id', $columnDirection)->select('*');
            }
        ]);

        // Add custom fields to the create/update views
        $this->crud->addField([
            'name' => 'name',
            'type' => 'text',
            'label' => "Name",
        ]);
        $this->crud->addField([
            'name' => 'description',
            'type' => 'textarea',
            'label' => "Description"
        ]);
        $this->crud->addField([
            'name' => 'skill_type_id',
            'label' => "Type",
            'type' => 'select_from_array',
            'options' => SkillType::all()->pluck('name', 'id')->toArray(),
            'allow_null' => false,
        ]);
    }

    /**
     * Action for creating a new Skill in the database.
     *
     * @param SkillCrudRequest $request Incoming form request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreRequest $request) // phpcs:ignore
    {
        return parent::storeCrud();
    }

    /**
     * Action for creating a new Skill in the database.
     *
     * @param SkillCrudRequest $request Incoming form request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateRequest $request) // phpcs:ignore
    {
        return parent::updateCrud();
    }
}
