<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lookup\Department;
use Backpack\CRUD\app\Http\Controllers\CrudController;

class JobPosterCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation { update as traitUpdate;
    }

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup() : void
    {
        $this->crud->setModel('App\Models\JobPoster');
        $this->crud->setRoute('admin/job-poster');
        $this->crud->setEntityNameStrings('Job Poster', 'Job Posters');

        if (!$this->request->has('order')) {
            $this->crud->orderBy('close_date_time', 'desc');
        }
    }

    public function setupListOperation()
    {
        // Add the custom blade buttons found in resources/views/vendor/backpack/crud/buttons/.
        $this->crud->addButtonFromView('line', 'job_admin_edit', 'job_admin_edit', 'end');
        $this->crud->addButtonFromView('line', 'spb_link', 'spb_link', 'end');
        $this->crud->addButtonFromView('line', 'jpb_link', 'jpb_link', 'end');
        $this->crud->addButtonFromView('line', 'job_poster_link', 'job_poster_link', 'end');


        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'number',
            'label' => 'ID'
        ]);
        $this->crud->addColumn([
            'name' => 'title',
            'type' => 'text',
            'label' => 'Title'
        ]);
        $this->crud->addColumn([
            'name' => 'status',
            'label' => 'Status',
            'type' => 'model_function',
            'function_name' => 'status'
        ]);
        $this->crud->addColumn([
            'name' => 'published',
            'label' => 'Published',
            'type' => 'check',
        ]);
        $this->crud->addColumn([
            'name' => 'manager_user_name',
            'type' => 'closure',
            'label' => 'Manager',
            'orderable' => false,
            'function' => function ($entry) {
                return '<a href="' . route('manager.profile.edit', $entry->manager->user->id) . '" target="_blank">' . $entry->manager->user->full_name . '</a>';
            }
        ]);
        $this->crud->addColumn([
            'name' => 'department.name',
            'label' => 'Department',
            'type' => 'text'
        ]);
        $this->crud->addColumn([
            'name' => 'submitted_applications_count',
            'label' => 'Total Applications',
            'type' => 'model_function',
            'function_name' => 'submitted_applications_count'
        ]);

        // Filters.
        $this->crud->addFilter([
            'name' => 'departments',
            'type' => 'select2_multiple',
            'label' => 'Departments'
        ], function () {
            return Department::all()->pluck('name', 'id')->toArray();
        }, function ($values) {
            $this->crud->addClause('WhereHas', 'department', function ($query) use ($values) {
                foreach (json_decode($values) as $key => $value) {
                    if ($key === 0) {
                        $query->where('id', $value);
                    } else {
                        $query->orWhere('id', $value);
                    }
                }
            });
        });
    }

    public function setupUpdateOperation()
    {
        $this->crud->addField([
            'name' => 'title',
            'label' => 'Title',
            'type' => 'text',
            'attributes' => [
                'readonly' => 'readonly'
            ]
        ]);
        $this->crud->addField([
            'name' => 'salary_min',
            'type' => 'number',
            'label' => 'Minimum Salary',
        ]);
        $this->crud->addField([
            'name' => 'salary_max',
            'type' => 'number',
            'label' => 'Maximum Salary',
        ]);
        $this->crud->addField([
            'name' => 'noc',
            'type' => 'number',
            'label' => 'NOC Code',
        ]);
        $this->crud->addField([
            'name' => 'open_date_time',
            'label' => 'Open Date',
            'type' => 'date_picker',
            'date_picker_options' => [
                'todayBtn' => 'linked',
                'format' => 'yyyy-mm-dd',
            ],
        ]);
        $this->crud->addField([
            'name' => 'close_date_time',
            'label' => 'Close Date',
            'type' => 'date_picker',
            'date_picker_options' => [
                'todayBtn' => 'linked',
                'format' => 'yyyy-mm-dd',
            ],
        ]);
        $this->crud->addField([
            'name' => 'start_date_time',
            'label' => 'Start Date',
            'type' => 'date_picker',
            'date_picker_options' => [
                'todayBtn' => 'linked',
                'format' => 'yyyy-mm-dd',
            ],
        ]);
        $this->crud->addField([
            'name' => 'process_number',
            'type' => 'number',
            'label' => 'Process #',
        ]);
        $this->crud->addField([
            'name' => 'priority_clearance_number',
            'type' => 'number',
            'label' => 'Priority Clearance #',
        ]);
        $this->crud->addField([
            'name' => 'loo_issuance_date',
            'type' => 'date_picker',
            'label' => 'Letter of Offer Issuance Date',
            'date_picker_options' => [
               'todayBtn' => 'linked',
               'format' => 'yyyy-mm-dd',
            ],
        ]);
        if ($this->crud->getCurrentEntry() &&
            !$this->crud->getCurrentEntry()->published
        ) {
            $this->crud->addField([
                'name' => 'published',
                'label' => 'Publish',
                'type' => 'checkbox'
            ]);
        }
    }

    public function update()
    {
        $open_date = $this->crud->request->request->get('open_date_time');
        $close_date = $this->crud->request->request->get('close_date_time');
        $start_date = $this->crud->request->request->get('start_date_time');
        $this->crud->request->request->remove('open_date_time');
        $this->crud->request->request->remove('close_date_time');
        $this->crud->request->request->remove('start_date_time');
        // Manipulates the input fields to save the "end of day" timestamp for
        // open/close/start dates.
        $this->crud->request->request->add([
            'open_date_time' => ptDayStartToUtcTime($open_date),
            'close_date_time' => ptDayEndToUtcTime($close_date),
            'start_date_time' => ptDayStartToUtcTime($start_date),
        ]);
        $response = $this->traitUpdate();

        return $response;
    }
}
