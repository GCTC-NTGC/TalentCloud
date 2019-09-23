<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Lookup\Frequency;
use App\Models\Lookup\Department;
use App\Models\Manager;

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

        // TODO: Improve workplace photos, and reference them in template direction from WorkEnvironment model.
        $workplacePhotos = [];
        if ($manager->work_environment != null) {
            foreach ($manager->work_environment->workplace_photo_captions as $photoCaption) {
                $workplacePhotos[] = [
                    'id' => $photoCaption->id,
                    'alt' => $photoCaption->description,
                    'alt_fr' => $photoCaption->description,
                    'url' => '/images/user.png'
                ];
            }
        }

        $frequencies = Frequency::all();

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
            'work_environment' => $manager->work_environment,
            'workplace_photos' => $workplacePhotos,
            'departments' => Department::all(),
            'telework_options' => $frequencies,
            'flex_hour_options' => $frequencies,
            'radio_options' => $frequencies,
            'show_notification' => $show_notification
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  \App\Models\Manager      $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Manager $manager)
    {
        $input = $request->input();

        // TODO: remove control of name in production.
        $manager->user->name = $input['name'];
        $manager->user->save();

        $manager->fill([
            'department_id' => $input['department'],
            'twitter_username' => $input['twitter_username'],
            'linkedin_url' => $input['linkedin_url'],
            'years_experience' => $input['years_experience'],
            'en' => [
                'about_me' => $input['about_me']['en'],
                'branch' =>  $input['branch']['en'],
                'division' => $input['division']['en'],
                'position' => $input['position']['en'],
                'leadership_style' => $input['leadership_style']['en'],
                'employee_learning' => $input['employee_learning']['en'],
                'expectations' => $input['expectations']['en'],
                'education' => $input['education']['en'],
                'career_journey' => $input['career_journey']['en'],
                'learning_path' => $input['learning_path']['en']
            ],
            'fr' => [
                'about_me' => $input['about_me']['fr'],
                'branch' =>  $input['branch']['fr'],
                'division' => $input['division']['fr'],
                'position' => $input['position']['fr'],
                'leadership_style' => $input['leadership_style']['fr'],
                'employee_learning' => $input['employee_learning']['fr'],
                'expectations' => $input['expectations']['fr'],
                'education' => $input['education']['fr'],
                'career_journey' => $input['career_journey']['fr'],
                'learning_path' => $input['learning_path']['fr']
            ]
        ]);

        $manager->save();

        $work_environment = $manager->work_environment;
        $work_environment->fill([
            'en' => [
                'things_to_know' => $input['things_to_know']['en']
            ],
            'fr' => [
                'things_to_know' => $input['things_to_know']['fr']
            ]
        ]);
        // Slider select inputs can be missing from input if nothing was selected.
        if (isset($input['telework'])) {
            $work_environment->telework_allowed_frequency_id = $input['telework'];
        }
        if (isset($input['flex_hours'])) {
            $work_environment->flexible_hours_frequency_id = $input['flex_hours'];
        }
        $work_environment->save();

        $team_culture = $manager->team_culture;
        $team_culture->fill([
            'team_size' => $input['team_size'],
            'gc_directory_url' => $input['gc_directory_url'],
            'en' => [
                'operating_context' => $input['operating_context']['en'],
                'what_we_value' => $input['what_we_value']['en'],
                'how_we_work' => $input['how_we_work']['en']
            ],
            'fr' => [
                'operating_context' => $input['operating_context']['fr'],
                'what_we_value' => $input['what_we_value']['fr'],
                'how_we_work' => $input['how_we_work']['fr']
            ]
        ]);
        $team_culture->save();

        // TODO: save workplace Photos.
        // Use the button that was clicked to decide which element to redirect to.
        switch ($input['submit']) {
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
        $show_notification = $request->user() && $request->user()->isDemoManager();

        return view(
            'applicant/static_faq',
            [
                'breadcrumb_home' => route('manager.home'),
                'faq' => Lang::get('applicant/faq'),
                'show_notification' => $show_notification
            ]
        );
    }
}
