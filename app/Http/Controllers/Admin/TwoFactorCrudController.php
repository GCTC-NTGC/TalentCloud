<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

class TwoFactorCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;

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

        $this->crud->addColumn([
            'name' => 'recovery_codes',
            'type' => 'text',
            'label' => 'Recovery Codes'
        ]);
    }
}
