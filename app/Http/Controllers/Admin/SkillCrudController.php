<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;
// Validation
use App\Http\Requests\SkillCrudRequest as StoreRequest;
use App\Http\Requests\SkillCrudRequest as UpdateRequest;

class SkillCrudController extends CrudController
{
    public function setup()
    {
        $this->crud->setModel("App\Models\Skill");
        $this->crud->setRoute("admin/skill");
        $this->crud->setEntityNameStrings('skill', 'skills');

        $this->crud->addColumn([
            'name' => 'name',
            'type' => 'text',
            'label' => 'Name'
        ]);
        $this->crud->addColumn([
            'name' => 'description',
            'type' => 'text',
            'label' => 'Description'
        ]);
        $this->crud->addColumn([
            'name' => 'skill_type.name',
            'type' => 'text',
            'label' => 'Type'
        ]);

        $this->crud->addField([
            'name' => 'name',
            'type' => 'text',
            'label' => "Name"
        ]);
        $this->crud->addField([
            'name' => 'description',
            'type' => 'textarea',
            'label' => "Description"
        ]);
        $this->crud->addField([
            'label' => "Type",
            'type' => 'select',
            'name' => 'skill_type_id', // the db column for the foreign key
            'entity' => 'skill_type', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
        ]);
    }

    public function store(StoreRequest $request)
    {
        return parent::storeCrud();
    }

    public function update(UpdateRequest $request)
    {
        return parent::updateCrud();
    }
}
