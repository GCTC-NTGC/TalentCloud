<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use App\Models\UserRole;

class UserCrudController extends CrudController
{
    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        $this->crud->setModel("App\Models\User");
        $this->crud->setRoute("admin/user");
        $this->crud->setEntityNameStrings('user', 'users');

        $this->crud->denyAccess('create');
        $this->crud->denyAccess('delete');

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name'
        ]);
        $this->crud->addColumn([
            'name' => 'email',
            'type' => 'text',
            'label' => 'Email'
        ]);
        $this->crud->addColumn([
            'name' => 'user_role.name',
            'type' => 'text',
            'label' => 'Role'
        ]);
        $this->crud->addColumn([
            'name' => 'is_priority',
            'type' => 'check',
            'label' => 'Priority'
        ]);

        $this->crud->addFilter([
            'name' => 'user_role',
            'type' => 'select2',
            'label' => 'Role'
        ], function () {
            return UserRole::all()->keyBy('id')->pluck('name', 'id')->toArray();
        }, function ($value) : void {
            $this->crud->addClause('where', 'user_role_id', $value);
        });

        $this->crud->addField([
            'name' => 'name',
            'label' => "Name",
            'type' => 'text',
            'attributes' => [
                'readonly'=>'readonly'
            ]
        ]);
        $this->crud->addField([
            'label' => "Role",
            'type' => 'select',
            'name' => 'user_role_id', // the db column for the foreign key
            'entity' => 'user_role', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
            'model' => "App\Models\UserRole" // foreign key model
        ]);
        $this->crud->addField([
            'name' => 'is_priority',
            'type' => 'checkbox',
            'label' => 'Priority'
        ]);
    }

    /**
     * Action for updating an existing User in the database.
     *
     * @param \Illuminate\Http\Request $request Incoming form request.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update($request) // phpcs:ignore
    {
        $response = parent::updateCrud();
        return $response;
    }
}
