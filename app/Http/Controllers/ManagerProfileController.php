<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Http\Controllers\Controller;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use App\Models\Manager;

class ManagerProfileController extends Controller {

    /**
     * Show the form for editing the logged-in user's manager profile
     *
     * @param  Request  $request
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Manager $manager) {

        //TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model
        $workplacePhotos = [];
        if ($manager->work_environment != null) {
            foreach($manager->work_environment->workplace_photo_captions as $photoCaption) {
                $workplacePhotos[] = [
                    'id' => $photoCaption->id,
                    'alt' => $photoCaption->description,
                    'alt_fr' => $photoCaption->description,
                    'url' => '/images/user.png'
                ];
            }
        }

        $frequencies = Frequency::all();

        return view('manager/profile', [
            'profile' => Lang::get('manager/manager_profile'),
            'urls' => Lang::get('common/urls'),
            'user' => $manager->user,
            'manager' => $manager,
            'manager_profile_photo_url' => '/images/user.png', //TODO get real photo
            'team_culture' => $manager->team_culture,
            'work_environment' => $manager->work_environment,
            'workplace_photos' => $workplacePhotos,
            'departments' => Department::all(),
            'telework_options' => $frequencies,
            'flex_hour_options' => $frequencies,
        ]);
    }

}
