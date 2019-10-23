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
        $this->crud->setModel('App\Models\Manager');
        $this->crud->setRoute('admin/manager');
        $this->crud->setEntityNameStrings('manager', 'managers');
    }

    public function setupListOperation()
    {
        $this->crud->removeButton('update');

        $this->crud->addColumn([
            'name' => 'user.name',
            'key' => 'user_name',
            'type' => 'text',
            'label' => 'Name'
        ]);
        $this->crud->addColumn([
            'name' => 'user.email',
            'key' => 'user_email',
            'type' => 'text',
            'label' => 'Email'
        ]);

        $this->crud->addButtonFromView('line', 'create_job_poster', 'create_job_poster', 'beginning');
        // Add the custom blade button found in resources/views/vendor/backpack/crud/buttons/profile_edit.blade.php.
        $this->crud->addButtonFromView('line', 'profile_edit', 'profile_edit', 'end');
    }
}
