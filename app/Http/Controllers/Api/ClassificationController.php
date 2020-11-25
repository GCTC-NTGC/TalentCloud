<?php

namespace App\Http\Controllers;
use App\Models\Classification;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Http\Request;

class ClassificationController extends Controller
{
    /**
     * Return the current applicant's application for a given Job Poster.
     *
     * @param  \App\Models\JobDetailsPage List of classification objects.
     * @return mixed|\App\Models\Classification
     */
    public function index()
    {
        return JsonResource::collection(Classification::all());
    }
}
