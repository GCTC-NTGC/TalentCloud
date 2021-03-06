<?php

namespace App\Http\Controllers\Admin;

use Jenssegers\Date\Date;
use App\Models\Lookup\Department;
use App\Models\Lookup\JobPosterStatus;
use App\Services\JobStatusTransitionManager;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class JobPosterCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation {
        update as traitUpdate;
    }

    /**
     * Prepare the admin interface by setting the associated
     * model, setting the route, and adding custom columns/fields.
     *
     * @return void
     */
    public function setup(): void
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
        // Required for order logic.
        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);

        // Add the custom blade buttons found in resources/views/vendor/backpack/crud/buttons/.
        $this->crud->addButtonFromView('line', 'job_admin_edit', 'job_admin_edit', 'end');
        $this->crud->addButtonFromView('line', 'spb_link', 'spb_link', 'end');
        $this->crud->addButtonFromView('line', 'jpb_link', 'jpb_link', 'end');
        $this->crud->addButtonFromView('line', 'job_poster_link', 'job_poster_link', 'end');
        $this->crud->addButtonFromView('line', 'applicants_download', 'applicants_download', 'end');

        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'number',
            'label' => 'ID'
        ]);
        $this->crud->addColumn([
            'name' => 'title',
            'type' => 'text',
            'label' => 'Title',
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale): void {
                $query->orWhere('title->' . $locale, 'ilike', "%$searchTerm%");
            },
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('title->' . $locale, $columnDirection)->select('*');
            }
        ]);
        $this->crud->addColumn([
            'name' => 'job_poster_status.key',
            'label' => 'Status',
            'type' => 'text',
            'orderable' => true,
            'orderLogic' => function ($query, $column, $columnDirection) {
                return $query->leftJoin('job_poster_status', 'job_poster_status.id', '=', 'job_posters.job_poster_status_id')
                    ->orderBy('job_poster_status.key', $columnDirection)->select('job_posters.*');
            }
        ]);
        $this->crud->addColumn([
            'name' => 'isOpen',
            'label' => 'Open',
            'type' => 'closure',
            'orderable' => false,
            'function' => function ($entry) {
                return $entry->isOpen() ?
                    '<span><i class="fa fa-check-circle"></i></span>' :
                    '<span><i class="fa fa-circle"></i></span>';
            }
        ]);
        $this->crud->addColumn([
            'name' => 'isClosed',
            'label' => 'Closed',
            'type' => 'closure',
            'orderable' => false,
            'function' => function ($entry) {
                return $entry->isClosed() ?
                    '<span><i class="fa fa-check-circle"></i></span>' :
                    '<span><i class="fa fa-circle"></i></span>';
            }
        ]);

        $this->crud->addColumn([
            'name' => 'internal_only',
            'label' => 'Internal Only',
            'type' => 'check',
        ]);

        $this->crud->addColumn([
            'name' => 'manager_user_name',
            'type' => 'closure',
            'label' => 'Manager',
            'orderable' => false,
            'function' => function ($entry) {
                return '<a href="' . route('manager.profile.edit', $entry->manager->id) . '" target="_blank">' . $entry->manager->user->full_name . '</a>';
            }
        ]);
        $this->crud->addColumn([
            'name' => 'department.name',
            'label' => 'Department',
            'type' => 'text'
        ]);
        $this->crud->addColumn([
            'name' => 'submitted_applications_count',
            'label' => 'Applications',
            'type' => 'closure',
            'function' =>
            function ($entry) {
                return $entry->submitted_applications_count() > 0 ?
                    '<a target="_blank" href="' . route('manager.jobs.applications', $entry->id) . '">' . $entry->submitted_applications_count() . ' (View <i class="fa fa-external-link"></i>)</a>' :
                    $entry->submitted_applications_count();
            }
        ]);

        // Filters.
        $this->crud->addFilter([
            'name' => 'departments',
            'type' => 'select2_multiple',
            'label' => 'Filter by department'
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

        $this->crud->addFilter([
            'name' => 'statuses',
            'type' => 'select2_multiple',
            'label' => 'Filter by status'
        ], function () {
            // Using key because some of the job status names are the same.
            return JobPosterStatus::all()->pluck('key', 'id')->toArray();
        }, function ($values) {
            $this->crud->addClause('WhereHas', 'job_poster_status', function ($query) use ($values) {
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
            'type' => 'text',
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

        $this->crud->addField([
            'name' => 'internal_only',
            'type' => 'checkbox',
            'label' => 'Internal Only (Do not list this poster on the Browse Jobs page. You must access it with the direct URL.)',
        ]);

        $transitionManager = new JobStatusTransitionManager();
        $job = $this->crud->getCurrentEntry();
        $legalDestinations = $transitionManager->legalDestinations($job->job_poster_status->key);
        $validStatuses = JobPosterStatus::all()->filter(function ($status) use ($job, $legalDestinations) {
            return in_array($status->key, $legalDestinations) || $status->id === $job->job_poster_status_id;
        });
        $statusOptions = $validStatuses->mapWithKeys(function ($status) {
            return [$status->id => $status->key];
        });
        $this->crud->addField([
            'name' => 'job_poster_status_id',
            'label' => 'Status',
            'type' => 'select_from_array',
            'options' => $statusOptions,
            'allows_null' => false,
            'default' => $job->job_poster_status_id,
        ]);

        // Strategic Talent Response fields
        $this->crud->addField([
            'label' => 'Talent Stream',
            'type' => 'select',
            'name' => 'talent_stream_id', // the db column for the foreign key
            'entity' => 'talent_stream', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
        ]);
        $this->crud->addField([
            'label' => 'Talent Stream Subcategory',
            'type' => 'select',
            'name' => 'talent_stream_category_id', // the db column for the foreign key
            'entity' => 'talent_stream_category', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
        ]);
        $this->crud->addField([
            'label' => 'Job Skill Level',
            'type' => 'select',
            'name' => 'job_skill_level_id', // the db column for the foreign key
            'entity' => 'job_skill_level', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
        ]);
    }

    public function update()
    {
        $open_date_time = $this->crud->request->request->get('open_date_time');
        $close_date_time = $this->crud->request->request->get('close_date_time');
        $start_date_time = $this->crud->request->request->get('start_date_time');

        $job = $this->crud->getCurrentEntry();

        $open_date_current = new Date("$job->open_date_time");
        $close_date_current = new Date("$job->close_date_time");
        $start_date_current = new Date("$job->start_date_time");

        if ($open_date_current->format('Y-m-d') !== $open_date_time) {
            $this->crud->request->request->remove('open_date_time');
            // Manipulates the input field to save the "start of day" timestamp.
            $this->crud->request->request->add([
                'open_date_time' => $open_date_time !== null ? ptDayStartToUtcTime($open_date_time) : null
            ]);
        } else {
            $this->crud->request->request->add([
                'open_date_time' => $open_date_current
            ]);
        }

        if ($close_date_current->format('Y-m-d') !== $close_date_time) {
            $this->crud->request->request->remove('close_date_time');
            // Manipulates the input field to save the "end of day" timestamp.
            $this->crud->request->request->add([
                'close_date_time' => $close_date_time !== null ? ptDayEndToUtcTime($close_date_time) : null
            ]);
        } else {
            $this->crud->request->request->add([
                'close_date_time' => $close_date_current
            ]);
        }

        if ($start_date_current->format('Y-m-d') !== $start_date_time) {
            $this->crud->request->request->remove('start_date_time');
            // Manipulates the input field to save the "start of day" timestamp.
            $this->crud->request->request->add([
                'start_date_time' => $start_date_time !== null ? ptDayStartToUtcTime($start_date_time) : null
            ]);
        } else {
            $this->crud->request->request->add([
                'start_date_time' => $start_date_current
            ]);
        }

        $response = $this->traitUpdate();

        return $response;
    }
}
