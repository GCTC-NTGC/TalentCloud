<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

/**
 * Class ApplicantCrudController
 * @package App\Http\Controllers\Admin
 * @property-read \Backpack\CRUD\app\Library\CrudPanel\CrudPanel $crud
 */
class ApplicantCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;

    public function setup()
    {
        $this->crud->setModel('App\Models\Applicant');
        $this->crud->setRoute(config('backpack.base.route_prefix') . '/applicant');
        $this->crud->setEntityNameStrings('applicant', 'applicants');
        $this->crud->denyAccess(['update', 'create', 'delete']);
        $this->crud->orderBy('id', 'asc');
        $this->crud->addButtonFromView('line', 'view_applicant', 'view_applicant', 'end');
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
            'name' => 'user.full_name',
            'type' => 'text',
            'label' => 'Full Name',
            'searchLogic' => function ($query, $column, $searchTerm) {
                $query->orWhereHas('user', function ($q) use ($searchTerm) {
                    $q->where('first_name', 'ilike', '%' . $searchTerm . '%')
                        ->orWhere('last_name', 'ilike', '%' . $searchTerm . '%');
                });
            }
        ]);

        $this->crud->addColumn([
            'name' => 'user.email',
            'type' => 'text',
            'label' => 'Email',
            'searchLogic' => function ($query, $column, $searchTerm) {
                $query->orWhereHas('user', function ($q) use ($searchTerm) {
                    $q->where('email', 'ilike', '%' . $searchTerm . '%');
                });
            }
        ]);
    }
}
