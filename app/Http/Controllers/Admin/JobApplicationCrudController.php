<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

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
    }
}
