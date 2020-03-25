<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobPoster;
use App\Models\Lookup\JobSkillLevel;
use App\Models\Lookup\TalentStream;
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
        $job_skill_levels = JobSkillLevel::all();

        $strategic_response_id = config('app.strategic_response_department_id');
        $strategic_response_jobs = JobPoster::where('department_id', $strategic_response_id)->get();

        $streams = [];

        // Iterate through all talent streams.
        foreach ($stream_names as $stream) {
            $specialties = [];
            // Iterate through jobs in strategic response department.
            // If the job stream equals current stream then move to next level.
            foreach ($strategic_response_jobs as $job) {
                if ($job->talent_stream->id == $stream->id) {
                    $levels = [];
                    // Iterate through job skill levels.
                    // If the job skill level equals current level then add level to levels array.
                    // Else add level but set job id to null.
                    foreach ($job_skill_levels as $level) {
                        if ($job->job_skill_level->id == $level->id) {
                            $levels[$level->name] = ['title' => $level->name, 'job_id' => $job->id];
                        } else {
                            $levels[$level->name] = ['title' => $level->name, 'job_id' => null];
                        }
                    }
                    // Push specialty title and associated levels to specialty array.
                    $specialties[$job->talent_stream_category->name] = [
                      'title' => $job->talent_stream_category->name,
                      'levels' => $levels,
                    ];
                }
            }
            // Push stream title and specialties to streams array.
            $streams[$stream->name] = [ 'title' => $stream->name, 'specialties' => $specialties];
        }

        return view('response/index/index', [
          'response' => Lang::get('response/index'),
          'streams' => $streams,
        ]);
    }
}
