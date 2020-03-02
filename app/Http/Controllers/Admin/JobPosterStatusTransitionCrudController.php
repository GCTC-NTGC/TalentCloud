<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class JobPosterStatusTransitionCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup(): void
    {
        // Eloquent model to associate with this collection of views and controller actions.
        $this->crud->setModel('App\Models\Lookup\JobPosterStatusTransition');
        // Custom backpack route.
        $this->crud->setRoute('admin/job-poster-status-transition');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('job status transition', 'job status transitions');

        $this->crud->operation(['create', 'update'], function () {
            $this->crud->addField([
                'name' => 'key',
                'type' => 'text',
                'label' => 'Key',
            ]);

            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
                'limit' => 120,
            ]);

            $this->crud->addField([  // Select
                'label' => 'Owner User Role',
                'type' => 'select',
                'name' => 'owner_user_role_id', // the db column for the foreign key
                'entity' => 'owner_user_role', // the method that defines the relationship in your Model
                'attribute' => 'key', // foreign key attribute that is shown to user
                'model' => \App\Models\UserRole::class, // foreign key model
            ]);

            $this->crud->addField([  // Select
                'label' => 'From Status',
                'type' => 'select',
                'name' => 'from_job_poster_status_id', // the db column for the foreign key
                'entity' => 'from', // the method that defines the relationship in your Model
                'attribute' => 'key', // foreign key attribute that is shown to user
                'model' => \App\Models\Lookup\JobPosterStatus::class, // foreign key model
            ]);

            $this->crud->addField([  // Select
                'label' => 'To Status',
                'type' => 'select',
                'name' => 'to_job_poster_status_id', // the db column for the foreign key
                'entity' => 'to', // the method that defines the relationship in your Model
                'attribute' => 'key', // foreign key attribute that is shown to user
                'model' => \App\Models\Lookup\JobPosterStatus::class, // foreign key model
            ]);

            $this->crud->addField([
                'name' => 'button_style',
                'label' => 'Button Style',
                'type' => 'select_from_array',
                'options' => ['default' => 'default', 'stop' => 'stop', 'go' => 'go'],
                'allows_null' => false,
                'default' => 'default',
                'fake' => true, // show the field, but don’t store it in the database column above
                'store_in' => 'metadata' // [optional] the database column name where you want the fake fields to ACTUALLY be stored as a JSON array
            ]);
        });
    }

    public function setupListOperation()
    {
        // Required for order logic.
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Add custom columns to the Department index view.
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true,
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name',
            'orderable' => true,
            'limit' => 70,
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            }
        ]);

        $this->crud->addColumn([
            'name' => 'from.name',
            'type' => 'text',
            'label' => 'From status',
            'orderable' => false,
        ]);

        $this->crud->addColumn([
            'name' => 'to.name',
            'type' => 'text',
            'label' => 'To status',
            'orderable' => false,
        ]);

        $this->crud->addColumn([
            'name' => 'owner_user_role.name',
            'type' => 'text',
            'label' => 'Owner User Role',
            'orderable' => false,
        ]);
    }
}
