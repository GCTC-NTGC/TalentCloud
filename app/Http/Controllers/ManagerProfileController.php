<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateManagerProfileRequest;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use App\Models\Manager;
use App\Services\Validation\Rules\LinkedInUrlRule;
use App\Services\Validation\Rules\TwitterHandleRule;
use Illuminate\Support\Facades\Hash;

class ManagerProfileController extends Controller
{

    /**
     * Show a manager profile
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Manager $manager)
    {
        $manager_profile = Lang::get('applicant/manager_profile');

        $manager_profile_sections = [
            [
                'title' => $manager_profile['section_titles']['approach'],
                'questions' => [
                    [
                        'title' => $manager_profile['questions']['leadership_style'],
                        'answer' => $manager->leadership_style
                    ],
                    [
                        'title' => $manager_profile['questions']['employee_expectations'],
                        'answer' => $manager->expectations
                    ],
                    [
                        'title' => $manager_profile['questions']['employee_learning'],
                        'answer' => $manager->employee_learning
                    ]
                ]
            ],
            [
                'title' => $manager_profile['section_titles']['about_me'],
                'questions' => [
                    [
                        'title' => $manager_profile['questions']['career_journey'],
                        'answer' => $manager->career_journey
                    ],
                    [
                        'title' => $manager_profile['questions']['learning_path'],
                        'answer' => $manager->learning_path
                    ],
                    [
                        'title' => $manager_profile['questions']['about_me'],
                        'answer' => $manager->about_me
                    ]
                ]
            ]
        ];


        return view('applicant/manager', [
            'manager_profile' => $manager_profile,
            'urls' => Lang::get('common/urls'),
            'manager' => $manager,
            'manager_profile_photo_url' => '/images/user.png', // TODO get real photo.
            'manager_profile_sections' => $manager_profile_sections,
        ]);
    }

    /**
     * Show the form for editing the logged-in manager's profile
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\Response
     */
    public function editAuthenticated(Request $request)
    {
        $manager = $request->user()->manager;
        return redirect(route('manager.profile.edit', $manager));
    }

    /**
     * Show the form for editing the logged-in user's manager profile
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Manager $manager)
    {
        $workEnvironment = $manager->work_environment;
        $teamCulture = $manager->team_culture;

        // TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model.
        $workplacePhotos = [];
        if ($workEnvironment != null) {
            foreach ($workEnvironment->workplace_photo_captions as $photoCaption) {
                $workplacePhotos[] = [
                    'id' => $photoCaption->id,
                    'alt' => $photoCaption->description,
                    'alt_fr' => $photoCaption->description,
                    'url' => '/images/user.png'
                ];
            }
        }

        $frequencies = Frequency::all();
        $linkedInUrlPattern = LinkedInUrlRule::PATTERN;
        $twitterHandlerPattern = TwitterHandleRule::PATTERN;

        $show_notification = Auth::user()->isDemoManager();

        return view('manager/profile', [
            // Localization.
            'profile_l10n' => Lang::get('manager/profile'),
            // Data.
            'urls' => Lang::get('common/urls'),
            'user' => $manager->user,
            'manager' => $manager,
            'manager_profile_photo_url' => '/images/user.png', // TODO get real photo.
            'team_culture' => $manager->team_culture,
            'work_environment' => $workEnvironment,
            'workplace_photos' => $workplacePhotos,
            'departments' => Department::all(),
            'telework_options' => $frequencies,
            'flex_hour_options' => $frequencies,
            'radio_options' => $frequencies,
            'managerEN' => $manager->translate('en'),
            'managerFR' => $manager->translate('fr'),
            'workEnvEN' => $workEnvironment->translate('en'),
            'workEnvFR' => $workEnvironment->translate('fr'),
            'teamCultureEN' => $teamCulture->translate('en'),
            'teamCultureFR' => $teamCulture->translate('fr'),
            'linkedInUrlPattern' => $linkedInUrlPattern,
            'twitterHandlerPattern' => $twitterHandlerPattern,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateManagerProfileRequest $request Incoming Request.
     * @param  \App\Models\Manager                          $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateManagerProfileRequest $request, Manager $manager)
    {
        // TODO: save workplace Photos.
        // TODO: remove control of name in production.
        $input = $request->input();

        // redirect to error messages element if validation fails
        if (isset($request->validator) && $request->validator->fails()) {
            $hash = '#managerProfileFormErrors';
            return redirect(route('manager.profile.edit', $manager).$hash)
                        ->withErrors($request->validator)
                        ->withInput();
        }

        $validated = $request->validated();

        $user = $manager->user;
        $user->fill($validated);
        $user->password = Hash::make($input['new_password']);
        $user->save();

        $work_environment = $manager->work_environment;
        $work_environment->fill($validated);
        $work_environment->save();

        $team_culture = $manager->team_culture;
        $team_culture->fill($validated);
        $team_culture->save();

        $manager->fill($validated);
        $manager->save();

        // Use the button that was clicked to decide which element to redirect to.
        switch ($input['submit']) {
            case 'account_settings':
                $hash = '#managerProfileSectionAccount';
                break;
            case 'about_me':
                $hash = '#managerProfileSectionAbout';
                break;
            case 'team_culture':
                $hash = '#managerProfileSectionCulture';
                break;
            case 'work_environment':
                $hash = '#managerProfileSectionEnvrionment';
                break;
            case 'leadership':
                $hash = '#managerProfileSectionLeadership';
                break;
            default:
                $hash = '';
                break;
        }

        return redirect(route('manager.profile.edit', $manager).$hash);
    }

    public function faq(Request $request)
    {
        $show_notification = $request->user()->isDemoManager();

        return view(
            'applicant/static_faq',
            [
                'faq' => Lang::get('applicant/faq'),
                'show_notification' => $show_notification
            ]
        );
    }
}
