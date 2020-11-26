<?php

namespace App\Http\Controllers\Admin;

// Validation.
use App\Http\Requests\SkillCategoryCrudRequest as StoreRequest;
use App\Http\Requests\SkillCategoryCrudRequest as UpdateRequest;
use App\Models\SkillCategory;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class SkillCategoryCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ReorderOperation;

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
        $this->crud->setModel('App\Models\SkillCategory');
        // Custom backpack route.
        $this->crud->setRoute('admin/skill-category');
        // Custom strings to display within the backpack UI,
        // things like Create Skill Category, Delete Skill Categories, etc.
        $this->crud->setEntityNameStrings('skill category', 'skill categories');

        $this->crud->operation(['create', 'update'], function () {
            // Add custom fields to the create/update views.
            $this->crud->addField([
                'name' => 'key',
                'type' => 'text',
                'label' => 'Key',
            ]);

            $this->crud->addField([
                'name' => 'name',
                'type' => 'textarea',
                'label' => 'Name',
                'limit' => 70,
            ]);

            $this->crud->addField([
                'name' => 'parent_id',
                'label' => 'Parent Category',
                'type' => 'select_from_array',
                'allows_null' => true,
                'options' => SkillCategory::where(
                    // Exclude self from options.
                    'id',
                    '!=',
                    $this->crud->getCurrentEntry() ? $this->crud->getCurrentEntry()->id : null
                )
                ->where(
                    // Include categories with depth of 1 (parent skill categories) in options.
                    'depth',
                    '=',
                    1
                )
                ->get()->pluck('name', 'id')->toArray(),
            ]);
        });
    }

    public function setupListOperation()
    {
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Remove delete button.
        $this->crud->removeButton('delete');

        // Add custom columns to the Skill Category index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true
        ]);

        $this->crud->addColumn([
            'name' => 'key',
            'type' => 'text',
            'label' => 'Key',
            'orderable' => true,
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('name->' . $locale, 'like', "%$searchTerm%");
            },
            'orderable' => false,
        ]);

        // Add filter for skill categories without a parent category.
        $this->crud->addFilter(
            [
                'type' => 'simple',
                'name' => 'noParentSkillCategory',
                'label'=> 'No parent skill category'
            ],
            false,
            function () {
                $this->crud->query = $this->crud->query->whereNull('parent_id');
            }
        );
    }

    protected function setupReorderOperation()
    {
        $this->crud->set('reorder.label', 'name');
        $this->crud->set('reorder.max_level', 2);
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
