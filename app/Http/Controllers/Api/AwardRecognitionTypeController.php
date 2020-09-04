<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\AwardRecognitionType;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardRecognitionTypeController extends Controller
{
    /**
     * Return all departments as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(AwardRecognitionType::all());
    }
}
