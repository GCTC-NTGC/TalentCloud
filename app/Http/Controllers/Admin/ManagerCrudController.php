<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

class ManagerCrudController extends CrudController
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
        $this->crud->setModel('App\Models\User');
        $this->crud->setRoute('admin/manager');
        $this->crud->setEntityNameStrings('manager', 'managers');

        // Don't show 'basic' users.
        $this->crud->addClause('whereIn', 'user_role_id', [2, 3]);
    }

    public function setupListOperation()
    {
        $this->crud->removeButton('update');

        $this->crud->addColumn([
            'name' => 'manager.id',
            'key' => 'manager_id',
            'type' => 'number',
            'label' => 'ID'
        ]);
        $this->crud->addColumn([
            'name' => 'manager.name',
            'key' => 'manager_name',
            'type' => 'text',
            'label' => 'Name'
        ]);
        $this->crud->addColumn([
            'name' => 'user_role.name',
            'type' => 'text',
            'key' => 'user_role_name',
            'label' => 'Role'
        ]);
        $this->crud->addColumn([
            'name' => 'email',
            'key' => 'manager_email',
            'type' => 'text',
            'label' => 'Email'
        ]);
        $this->crud->addColumn([
            'name' => 'gov_email',
            'key' => 'government_email',
            'type' => 'text',
            'label' => 'Government Email'
        ]);
        $this->crud->addColumn([
            'name' => 'manager.department.name',
            'key' => 'manager_department',
            'type' => 'text',
            'label' => 'Department',
            'limit' => 70
        ]);

        // Add the custom blade button found in resources/views/vendor/backpack/crud/buttons/profile_edit.blade.php.
        $this->crud->addButtonFromView('line', 'create_job_poster', 'create_job_poster', 'beginning');
        $this->crud->addButtonFromView('line', 'profile_edit', 'profile_edit', 'end');
    }
}
