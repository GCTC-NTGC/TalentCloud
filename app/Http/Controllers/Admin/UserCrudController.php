<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use App\Models\UserRole;

class UserCrudController extends CrudController
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
        $this->crud->setRoute('admin/user');
        $this->crud->setEntityNameStrings('user', 'users');
    }

    public function setupListOperation()
    {
        $this->crud->addColumn([
            'name' => 'first_name',
            'type' => 'text',
            'label' => 'First Name'
        ]);
        $this->crud->addColumn([
            'name' => 'last_name',
            'type' => 'text',
            'label' => 'Last Name'
        ]);
        $this->crud->addColumn([
            'name' => 'email',
            'type' => 'text',
            'label' => 'Email'
        ]);
        $this->crud->addColumn([
            'name' => 'user_role.name',
            'type' => 'text',
            'key' => 'user_role_name',
            'label' => 'Role'
        ]);
        $this->crud->addColumn([
            'name' => 'gov_email',
            'type' => 'text',
            'label' => 'Gov Email'
        ]);
        $this->crud->addColumn([
            'name' => 'not_in_gov',
            'type' => 'check',
            'label' => 'Not in Gov'
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
            'label' => 'Role',
            'type' => 'select',
            'name' => 'user_role_id', // The db column for the foreign key.
            'entity' => 'user_role', // The method that defines the relationship in your Model.
            'attribute' => 'name', // Foreign key attribute that is shown to user.
            'model' => 'App\Models\UserRole' // Foreign key model.
        ]);
        $this->crud->addField([
            'name' => 'is_priority',
            'type' => 'checkbox',
            'label' => 'Priority'
        ]);
    }
}
