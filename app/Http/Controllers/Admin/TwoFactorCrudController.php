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
        $this->crud->setEntityNameStrings('Manage 2FA', 'Manage 2FA');
        // Only show current user.
        if (\Auth::user()->hasRole('admin')) {
            $this->crud->addClause('where', 'id', '=', \Auth::user()->id);
        }
    }

    public function setupListOperation()
    {
        $this->crud->removeButton('update');

        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => false
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'orderable' => false
        ]);

        $this->crud->addColumn([
            'name' => 'google2fa_secret',
            'type' => 'check',
            'label' => '2FA Enabled',
            'orderable' => false
        ]);

        $this->crud->addColumn([
            'name' => 'recovery_codes',
            'type' => 'array',
            'label' => 'Recovery Codes',
            'orderable' => false,
        ]);

        // Add the custom blade buttons (resources/views/vendor/backpack/crud/buttons).
        $this->crud->addButtonFromView('line', 'recovery_codes', 'recovery_codes', 'beginning');
        $this->crud->addButtonFromView('line', 'deactivate_2fa', 'deactivate_2fa', 'end');
    }
}
