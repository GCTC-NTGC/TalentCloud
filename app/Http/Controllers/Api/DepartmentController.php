<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\Department;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentController extends Controller
{
    /**
     * Return all departments as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(Department::all());
    }
}
