<?php

namespace App\Http\Controllers;
use App\Models\Classification;

use Illuminate\Http\Request;

class ClassificationsController extends Controller
{
    /**
     * Return the current applicant's application for a given Job Poster.
     *
     * @param  \App\Models\JobDetailsPage List of classification objects.
     * @return mixed|\App\Models\Classification
     */
    public function getClassifications()
    {
        return Classification::all();
    }
}
