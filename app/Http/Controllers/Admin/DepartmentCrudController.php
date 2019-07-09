<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
// Validation.
use App\Http\Requests\DepartmentCrudRequest as StoreRequest;
use App\Http\Requests\DepartmentCrudRequest as UpdateRequest;

class DepartmentCrudController extends CrudController
{
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

        // Add custom columns to the Department index view.
        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
        ]);

        $this->crud->addColumn([
            'name' => 'impact',
            'type' => 'text',
            'label' => 'Impact',
            'orderable' => false,
        ]);

        // Add custom fields to the create/update views.
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
    }

    /**
     * Action for creating a new department in the database.
     *
     * @param  \App\Http\Requests\DepartmentCrudRequest $request Incoming form request.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreRequest $request) // phpcs:ignore
    {
        return parent::storeCrud();
    }

    /**
     * Action for updating an existing department in the database.
     *
     * @param  \App\Http\Requests\DepartmentCrudRequest $request Incoming form request.
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateRequest $request) // phpcs:ignore
    {
        return parent::updateCrud();
    }
}
