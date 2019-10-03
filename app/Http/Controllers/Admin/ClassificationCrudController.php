<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ClassificationCrudRequest as StoreRequest;
use App\Http\Requests\ClassificationCrudRequest as UpdateRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;

class ClassificationCrudController extends CrudController
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
        $this->crud->setModel('App\Models\Classification');
        // Custom backpack route.
        $this->crud->setRoute('admin/classification');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('classification', 'classifications');

        $this->crud->operation(['create', 'update'], function () {
            $this->crud->addField([
                'name' => 'key',
                'type' => 'text',
                'label' => 'Key',
            ]);
        });
    }

    public function setupListOperation()
    {
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
