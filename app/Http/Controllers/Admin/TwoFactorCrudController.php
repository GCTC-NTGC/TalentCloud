<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

class TwoFactorCrudController extends CrudController
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
        $this->crud->setRoute('admin/2fa');
        $this->crud->setEntityNameStrings('admin', 'admins');
    }

    public function setupListOperation()
    {
        $this->crud->removeButton('update');

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name'
        ]);

        $this->crud->addColumn([
            'name' => 'google2fa_secret',
            'type' => 'text',
            'label' => 'Google 2FA Secret'
        ]);

        $this->crud->addButtonFromView('line', 'recovery_codes', 'recovery_codes', 'beginning');
        $this->crud->addButtonFromView('line', 'deactivate_2fa', 'deactivate_2fa', 'end');
    }
}
