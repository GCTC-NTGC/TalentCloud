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
        return Department::all()->map->toApiArray();
    }
}
