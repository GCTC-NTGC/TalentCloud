<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRoleCrudRequest as UpdateRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class UserRoleCrudController extends CrudController
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
        // Eloquent model to associate with this collection
        // of views and controller actions.
        $this->crud->setModel('App\Models\UserRole');
        // Custom backpack route.
        $this->crud->setRoute('admin/user-role');
        // Custom strings to display within the backpack UI,
        // things like Create User Role, Delete User Roles, etc.
        $this->crud->setEntityNameStrings('user role', 'user roles');

        $this->crud->operation(['update'], function () {
            // Add custom fields to the update views.
            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
            ]);
        });
    }

    public function setupListOperation()
    {
        // Workaround for how the unique_translation validation
        // works in App\Http\Requests\UserRoleCrudRequest.
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Remove create/delete buttons.
        $this->crud->removeButton('delete');
        $this->crud->removeButton('create');

        // Add custom columns to the User Role index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true
        ]);

        $this->crud->addColumn([
            'name' => 'key',
            'type' => 'text',
            'label' => 'Key',
            'orderable' => true
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale) : void {
                $query->orWhere('name->' . $locale, 'like', "%$searchTerm%");
            },
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            }
        ]);
    }

    public function setupUpdateOperation()
    {
        $this->crud->setValidation(UpdateRequest::class);
    }
}
