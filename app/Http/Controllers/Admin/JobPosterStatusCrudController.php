<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class JobPosterStatusCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup(): void
    {
        // Eloquent model to associate with this collection of views and controller actions.
        $this->crud->setModel('App\Models\Lookup\JobPosterStatus');
        // Custom backpack route.
        $this->crud->setRoute('admin/job-poster-status');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('job status', 'job statuses');

        $this->crud->operation(['update'], function () {
            $this->crud->addField([
                'name' => 'key',
                'type' => 'text',
                'label' => 'key',
                'attributes' => ['disabled' => 'disabled']
            ]);
            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
                'limit' => 120,
            ]);
            $this->crud->addField([
                'name' => 'description',
                'type' => 'textarea',
                'label' => 'Description',
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
            'name' => 'description',
            'type' => 'text',
            'label' => 'Description',
            'orderable' => false,
            'limit' => 120,
        ]);
    }
}
