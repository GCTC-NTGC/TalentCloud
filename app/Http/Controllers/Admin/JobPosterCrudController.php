<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

class JobPosterCrudController extends CrudController
{
    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        $this->crud->setModel("App\Models\JobPoster");
        $this->crud->setRoute("admin/job-poster");
        $this->crud->setEntityNameStrings('Job Poster', 'Job Posters');

        $this->crud->denyAccess('create');
        $this->crud->denyAccess('delete');

        if (!$this->request->has('order')) {
            $this->crud->orderBy('close_date_time', 'desc');
        }

        $this->crud->addColumn([
            'name' => 'title',
            'type' => 'text',
            'label' => 'Title'
        ]);
        $this->crud->addColumn([
            'name' => 'open_date_time',
            'type' => 'datetime',
            'label' => 'Open Date'
        ]);
        $this->crud->addColumn([
            'name' => 'close_date_time',
            'type' => 'datetime',
            'label' => 'Close Date'
        ]);
        $this->crud->addColumn([
            'name' => "status",
            'label' => "Status",
            'type' => "model_function",
            'function_name' => 'displayStatus',
        ]);
        $this->crud->addColumn([
            'name' => "published",
            'label' => "Published",
            'type' => "check",
        ]);
        $this->crud->addColumn([
            'name' => 'manager.user.name',
            'type' => 'text',
            'label' => 'Manager'
        ]);
        $this->crud->addColumn([
            'name' => "submitted_applications_count",
            'label' => "Applications",
            'type' => "model_function",
            'function_name' => 'submitted_applications_count',
        ]);

        $this->crud->addField([
            'name' => 'title',
            'label' => "Title",
            'type' => 'text',
            'attributes' => [
                'readonly' => 'readonly'
            ]
        ]);
        $this->crud->addField([
            'name' => 'close_date_time',
            'label' => 'Close Date',
            'type' => 'datetime_picker',
            'datetime_picker_options' => [
                'format' => 'YYYY-MM-DD HH:mm:ss',
            ],
        ]);
        if ($this->crud->getCurrentEntry() && !$this->crud->getCurrentEntry()->published) {
            $this->crud->addField([
                'name' => 'published',
                'label' => 'Publish',
                'type' => 'checkbox'
            ]);
        }
    }

    /**
     * Action for updating an existing Job Poster in the database.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update($request) // phpcs:ignore
    {
        return parent::updateCrud();
    }
}
