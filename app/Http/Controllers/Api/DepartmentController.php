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
        $strategicDepartmentId = config('app.strategic_response_department_id');
        $departments = Department::where('id', '<>', $strategicDepartmentId)->get();
        return JsonResource::collection($departments);
    }
}
