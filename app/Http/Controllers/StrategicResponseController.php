<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\Lookup\JobPosterStatus;
use App\Models\Lookup\JobSkillLevel;
use App\Models\Lookup\TalentStream;
use App\Models\Lookup\TalentStreamCategory;
use Illuminate\Support\Facades\Lang;

class StrategicResponseController extends Controller
{

    /**
     * Show the strategic response home page.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $stream_names = TalentStream::all();
        $stream_specialties = TalentStreamCategory::all();
        $job_skill_levels = JobSkillLevel::all();

        $strategic_response_id = config('app.strategic_response_department_id');
        $strategic_response_jobs = JobPoster::where('department_id', $strategic_response_id)
            ->where('job_poster_status_id', JobPosterStatus::where('key', 'live')->first()->id)
            ->get();

        $streams = [];
        // Iterate through all talent streams.
        foreach ($stream_names as $stream) {
            $stream_jobs = $strategic_response_jobs->where('talent_stream_id', $stream->id);
            $specialties = [];
            $specialties_count = 0;
            foreach ($stream_specialties as $specialty) {
                $stream_specialty_jobs = $stream_jobs->where('talent_stream_category_id', $specialty->id);
                if ($stream_specialty_jobs->isNotEmpty()) {
                    $levels = [];
                    foreach ($job_skill_levels as $level) {
                        $job = $stream_specialty_jobs->firstWhere('job_skill_level_id', $level->id);
                        if ($job) {
                            $levels[$level->name] = ['title' => $level->name, 'job_id' => $job->id];
                            $specialties_count += 1;
                        } else {
                            $levels[$level->name] = ['title' => $level->name, 'job_id' => null];
                        }
                    }

                    // Push specialty title and associated levels to specialty array.
                    $specialties[$specialty->name] = [
                        'title' => $specialty->name,
                        'levels' => $levels,
                    ];
                }
            }
            if (!empty($specialties)) {
                ksort($specialties);

                // Push stream title and specialties to streams array.
                $streams[$stream->name] = [
                    'title' => $stream->name,
                    'specialties' => $specialties,
                    'count' => $specialties_count,
                ];
            }
        }
        ksort($streams);

        return view('response/index/index', [
            'response' => Lang::get('response/index'),
            'streams' => $streams,
        ]);
    }

    /**
     * Show the strategic response faq page.
     * @return \Illuminate\Http\Response
     */
    public function faq()
    {
        return view('response/faq/index', [
            'response_faq' => Lang::get('response/faq'),
        ]);
    }
}
