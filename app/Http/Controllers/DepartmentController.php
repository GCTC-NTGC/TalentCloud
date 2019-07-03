<?php

namespace App\Http\Controllers;

use App\Models\Lookup\Department;

class DepartmentController extends Controller
{
    /**
     * Return all departments as an array
     *
     * @return mixed
     */
    public function index()
    {
        $departments = Department::all();
        $departmentsArray = [];
        // TODO: improve effiency of getting translations.
        foreach ($departments as $department) {
            $translations = [
                'en' => [
                    'name' => $department->getTranslation('name', 'en'),
                    'impact' => $department->getTranslation('impact', 'en'),
                ],
                'fr' => [
                    'name' => $department->getTranslation('name', 'fr'),
                    'impact' => $department->getTranslation('impact', 'fr'),
                ]
            ];
            $departmentsArray[] = array_merge($department->toArray(), $translations);
        }
        return ['departments' => $departmentsArray];
    }
}
