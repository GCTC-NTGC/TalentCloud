<?php

namespace App\Http\Controllers\Admin;

use Backpack\CRUD\app\Http\Controllers\CrudController;

class SkillCrudController extends CrudController
{
    public function setup()
    {
        $this->crud->setModel("App\Models\Skill");
        $this->crud->setRoute("admin/skill");
        $this->crud->setEntityNameStrings('skill', 'skills');

        $this->crud->addColumn([
            'name' => 'skill',
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
            'name' => 'skill',
            'type' => 'text',
            'label' => "Name"
        ]);
        $this->crud->addField([
            'name' => 'description',
            'type' => 'text',
            'label' => "Description"
        ]);
        $this->crud->addField([  // Select
            'label' => "Type",
            'type' => 'select',
            'name' => 'skill_type_id', // the db column for the foreign key
            'entity' => 'skill_type', // the method that defines the relationship in your Model
            'attribute' => 'name', // foreign key attribute that is shown to user
        ]);
    }
}
