<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ClassificationCrudRequest as StoreRequest;
use App\Http\Requests\ClassificationCrudRequest as UpdateRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;

class ClassificationCrudController extends CrudController
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
        $this->crud->setModel('App\Models\Classification');
        // Custom backpack route.
        $this->crud->setRoute('admin/classification');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('classification', 'classifications');
        // No deleting classifications.
        $this->crud->denyAccess('delete');

        // Add custom columns to the classification index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
        ]);

        $this->crud->addColumn([
            'name' => 'key',
            'type' => 'text',
            'label' => 'Key',
        ]);

        // Add custom fields to the create/update views.
        $this->crud->addField([
            'name' => 'key',
            'type' => 'text',
            'label' => 'Key',
        ]);
    }

    /**
     * Action for creating a new classification in the database.
     *
     * @param \App\Http\Requests\ClassificationCrudRequest $request Incoming form request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(StoreRequest $request) // phpcs:ignore
    {
        return parent::storeCrud();
    }

    /**
     * Action for updating an existing classification in the database.
     *
     * @param \App\Http\Requests\ClassificationCrudRequest $request Incoming form request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UpdateRequest $request) // phpcs:ignore
    {
        return parent::updateCrud();
    }
}
