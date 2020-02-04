<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lookup\Department;
use Backpack\CRUD\app\Http\Controllers\CrudController;

class HrAdvisorCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        $this->crud->setModel('App\Models\HrAdvisor');
        $this->crud->setRoute('admin/hr');
        $this->crud->setEntityNameStrings('HR advisor', 'HR advisors');
    }

    public function setupListOperation()
    {
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'number',
            'label' => 'ID'
        ]);
        $this->crud->addColumn([
            'name' => 'user.full_name',
            'key' => 'full_name',
            'type' => 'text',
            'label' => 'Name'
        ]);
        $this->crud->addColumn([
            'name' => 'department.name',
            'type' => 'text',
            'label' => 'Department',
            'limit' => 70
        ]);
    }

    public function setupUpdateOperation()
    {
        $this->crud->addField([
            'name' => 'name',
            'label' => 'Name',
            'type' => 'text',
            'attributes' => [
                'readonly'=>'readonly'
            ]
        ]);
        $this->crud->addField([
            'label' => 'Department',
            'type' => 'select2',
            'name' => 'department_id', // The db column for the foreign key.
            'entity' => 'department', // The method that defines the relationship in your Model.
            'attribute' => 'name', // Foreign key attribute that is shown to user.
            'model' => 'App\Models\Lookup\Department' // Foreign key model.
        ]);
    }
}
