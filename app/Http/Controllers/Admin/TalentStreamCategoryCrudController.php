<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class TalentStreamCategoryCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\Crud\app\Http\Controllers\Operations\CreateOperation;
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
        $this->crud->setModel('App\Models\Lookup\TalentStreamCategory');
        // Custom backpack route.
        $this->crud->setRoute('admin/talent-stream-category');
        // Custom strings to display within the backpack UI.
        $this->crud->setEntityNameStrings('talent stream category', 'talent stream categories');

        $this->crud->operation(['create', 'update'], function () {
            $this->crud->addField([
                'name' => 'key',
                'type' => 'text',
                'label' => 'key',
            ]);
            $this->crud->addField([
                'name' => 'name',
                'type' => 'text',
                'label' => 'Name',
                'limit' => 120,
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

        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
            'orderable' => true,
        ]);
        $this->crud->addColumn([
            'name' => 'key',
            'type' => 'text',
            'label' => 'Key',
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
    }
}
