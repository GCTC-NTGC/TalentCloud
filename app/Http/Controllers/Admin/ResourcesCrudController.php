<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\ResourceCrudRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Illuminate\Support\Facades\App;

class ResourcesCrudController extends CrudController
{

    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;

    /**
     * Setup for the Resource CRUD panel. Everything here is applied on ALL operations.
     *
     * @return void
     */
    public function setup()
    {
        $this->crud->setModel('App\Models\Resource');
        $this->crud->setRoute('admin/resource');
        $this->crud->setEntityNameStrings('resource', 'resources');
    }

    /**
     * Setup list of resources.
     *
     * @return void
     */
    protected function setupListOperation()
    {
        $this->crud->removeButton('show');

        $locale = 'en';
        if (null !== $this->request->input('locale')) {
            $locale = $this->request->input('locale');
        }
        App::setLocale($locale);
        $this->crud->addColumn([
            'name' => 'id',
            'type' => 'text',
            'label' => 'ID',
        ]);

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Title',
            'orderLogic' => function ($query, $column, $columnDirection) use ($locale) {
                return $query->orderBy('name->' . $locale, $columnDirection)->select('*');
            },
            'searchLogic' => function ($query, $column, $searchTerm) use ($locale): void {
                $query->orWhere('name->' . $locale, 'ilike', "%$searchTerm%");
            },
        ]);
    }

    /**
     * Create resource operation.
     *
     * @return void
     */
    protected function setupCreateOperation()
    {
        $this->crud->setValidation(ResourceCrudRequest::class);

        $this->crud->addField([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Title',
        ]);

        $this->crud->addField([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Title'
        ]);

        $this->crud->addField([
            'name' => 'file',
            'label' => 'File',
            'type' => 'upload',
            'upload' => true,
        ]);
    }

    /**
     * Update resource operation.
     *
     * @return void
     */
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}
