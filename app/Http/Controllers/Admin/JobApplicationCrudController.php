<?php

namespace App\Http\Controllers\Admin;

use App\Models\Lookup\ApplicationStatus;
use Backpack\CRUD\app\Http\Controllers\CrudController;

/**
 * Class JobApplicationCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class JobApplicationCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;

    public function setup()
    {
        $this->crud->setModel('App\Models\JobApplication');
        $this->crud->setRoute(config('backpack.base.route_prefix') . '/job-application');
        $this->crud->setEntityNameStrings('application', 'applications');
        $this->crud->denyAccess(['update', 'create', 'delete']);
        $this->crud->orderBy('id', 'asc');
        $this->crud->addButtonFromView('line', 'view_job_application', 'view_job_application', 'end');
    }

    protected function setupListOperation()
    {
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'number',
            'label' => 'ID',
            'orderable' => true,
        ]);

        $this->crud->addColumn([
            'name' => 'job_poster.title',
            'type' => 'text',
            'label' => 'Job Poster Title',
            'searchLogic' => function ($query, $column, $searchTerm) {
                $query->orWhereHas('job_poster', function ($q) use ($searchTerm) {
                    $q->where('title', 'ilike', '%'.$searchTerm.'%');
                });
            }
        ]);

        $this->crud->addColumn([
            'name' => 'applicant.user.full_name',
            'type' => 'text',
            'label' => 'Applicant Name',
            'searchLogic' => function ($query, $column, $searchTerm) {
                $query->orWhereHas('applicant.user', function ($q) use ($searchTerm) {
                    $q->where('first_name', 'ilike', '%'.$searchTerm.'%')
                    ->orWhere('last_name', 'ilike', '%'.$searchTerm.'%');
                });
            }
        ]);

        $this->crud->addColumn([
            'name' => 'applicant.user.email',
            'type' => 'text',
            'label' => 'Applicant Email',
            'searchLogic' => function ($query, $column, $searchTerm) {
                $query->orWhereHas('applicant.user', function ($q) use ($searchTerm) {
                    $q->where('email', 'ilike', '%'.$searchTerm.'%');
                });
            }
        ]);

        $this->crud->addColumn([
            'name' => 'application_status.name',
            'type' => 'text',
            'label' => 'Application Status',
        ]);

        $this->crud->addFilter([
            'name' => 'application_status',
            'key' => 'application_status_filter',
            'type' => 'select2_multiple',
            'label' => 'Filter by Application Status'
        ], function () {
            // The options that show up in the select2.
            return ApplicationStatus::all()->pluck('name', 'id')->toArray();
        }, function ($values) {
            // If the filter is active.
            foreach (json_decode($values) as $key => $value) {
                $this->crud->query = $this->crud->query->orWhereHas('application_status', function ($query) use ($value) {
                    $query->where('id', $value);
                });
            }
        });
    }
}
