<?php

namespace App\Http\Controllers\Api;

use App\Models\Lookup\Department;
use App\Http\Controllers\Controller;

class DepartmentController extends Controller
{
    /**
     * Return all skills as an array
     *
     * @return mixed
     */
    public function index()
    {
        $departments = Department::all();
        $departmentsTranslated = [];
        foreach ($departments as $department) {
            $deptArray = ['id' => $department->id];
            foreach (['en', 'fr'] as $locale) {
                $deptArray[$locale] = [
                    'name' => $department->getTranslation('name', $locale),
                    'impact' => $department->getTranslation('impact', $locale),
                ];
            }
            $departmentsTranslated[] = $deptArray;
        }
        return $departmentsTranslated;
    }
}
