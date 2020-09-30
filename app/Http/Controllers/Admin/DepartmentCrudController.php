<?php

namespace App\Http\Controllers\Admin;

// Validation.
use App\Http\Requests\DepartmentCrudRequest as StoreRequest;
use App\Http\Requests\DepartmentCrudRequest as UpdateRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class DepartmentCrudController extends CrudController
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
        // Eloquent model to associate with this collection of views and controller actions.
        $this->crud->setModel('App\Models\Lookup\Department');
        // Custom backpack route.
        $this->crud->setRoute('admin/department');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('department', 'departments');

        $this->crud->operation(['create', 'update'], function () {
            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
            ]);

            $this->crud->addField([
                'name' => 'impact',
                'type' => 'textarea',
                'label' => 'Impact',
            ]);

            $this->crud->addField([
                'name' => 'preference',
                'type' => 'textarea',
                'label' => 'Preference',
            ]);

            $this->crud->addField([
                'name' => 'allow_indeterminate',
                'type' => 'checkbox',
                'label' => 'Allow Indeterminate: allow Indeterminate length jobs to be created within this department.',
            ]);
        });
    }

    public function setupListOperation()
    {
        // Required for order logic.
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Remove delete button.
        $this->crud->removeButton('delete');

        // Add custom columns to the Department index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true,
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'orderable' => true,
            'limit' => 70,
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            }
        ]);

        $this->crud->addColumn([
            'name' => 'impact',
            'type' => 'text',
            'label' => 'Impact',
            'orderable' => false,
            'limit' => 70,
        ]);

        $this->crud->addColumn([
            'name' => 'preference',
            'type' => 'text',
            'label' => 'Preference',
            'orderable' => false,
            'limit' => 70,
        ]);

        $this->crud->addColumn([
            'name' => 'allow_indeterminate',
            'type' => 'check',
            'label' => 'Allow Indeterminate',
        ]);
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
