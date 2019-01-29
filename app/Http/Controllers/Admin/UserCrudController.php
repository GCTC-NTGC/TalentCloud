<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use App\Models\UserRole;

class UserCrudController extends CrudController
{
    public function setup()
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

        $this->crud->addFilter([
            'name' => 'user_role',
            'type' => 'select2',
            'label' => 'Role'
        ], function () {
            return UserRole::all()->keyBy('id')->pluck('name', 'id')->toArray();
        }, function ($value) {
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

        dd($this->crud->query);
    }

    public function update($request)
    {
        $response = parent::updateCrud();
        return $response;
    }
}
