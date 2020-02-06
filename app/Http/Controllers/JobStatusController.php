<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\JobApplication;
use Carbon\Carbon;
use App\Models\JobPoster;
use App\Models\JobPosterQuestion;
use App\Models\Manager;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use App\Services\Validation\JobPosterValidator;
use Facades\App\Services\WhichPortal;

class JobStatusController extends Controller
{
    protected $transition_graph = [
        'states' => [
            'draft',
            'review_hr',
            'review_manager',
            'translation',
            'final_review_manager',
            'final_review_hr',
            'awaiting_approval',
            'approved',
            'published',
            'complete'
        ]
    ];
}
