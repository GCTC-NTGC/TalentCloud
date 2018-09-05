<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Lang;
use Illuminate\Http\Request;
use Barryvdh\Debugbar\Facade as Debugbar;
use App\Models\Degree;
use App\Models\Applicant;
use App\Models\Course;
use App\Models\WorkExperience;
use App\Models\Lookup\DegreeType;
use App\Models\Lookup\CourseStatus;
use App\Models\Skill;
use App\Http\Controllers\Controller;

class SkillsController extends Controller
{

    /**
     * Display the Skills page associated with the applicant.
     *
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function show(Applicant $applicant)
    {
        //

    }

    /**
     * Show the form for editing the applicant's skills
     *
     * @param  Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Applicant $applicant)
    {
        // return view('applicant/profile_02_experience', [
        //     'applicant' => $applicant,
        //     'profile' => Lang::get('applicant/profile_experience'),
        //     'degree_types' => DegreeType::all(),
        //     'course_status' => CourseStatus::all(),
        //     'degree_template' => Lang::get('common/degree'),
        //     'course_template' => Lang::get('common/course'),
        //     'work_template' => Lang::get('common/work_experience'),
        //     'form_submit_action' => route('profile.skills.update', $applicant)
        // ]);

        return view('applicant/profile_03_skills', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_skills'),
            'skill_template' => Lang::get('common/skills'),
            "relative_template" => Lang::get('common/relatives'),
            "skills" => Skill::all(),
        ]);
    }

    /**
     * Update the applicant's profile in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Applicant  $applicant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Applicant $applicant)
    {
        $input = $request->input();

        $newDegrees = [];
        $newCourses = [];
        $newWorkExperiences = [];

        $oldDegrees = [];
        $oldCourses = [];
        $oldWorkExperiences = [];

        /**
         * If an obj exists at $array[$key], return it.
         * Otherwise, set $array[$key] to be a new instance of $class,
         * set applicant_id, and return it.
         *
         * @param  [type] $array [description]
         * @param  [type] $key   [description]
         * @param  [type] $class [description]
         * @return [type]        [description]
         */
        function getModelFromArrayOrSetNew(&$array, $key, $class, $applicant) {
            if (isset($array[$key]) && $array[$key] != null ) {
                $obj = $array[$key];
            } else {
                $obj = new $class;
                $obj->applicant_id = $applicant->id;
                $array[$key] = $obj;
            }
            return $obj;
        }

        /**
         * For each item in an array, create a new model instance and set the
         * specified attribute with the value in the array.
         *
         * If an instance alread exists in the $instances array that matches
         * the $inputArray key, then set the attribute on that instance instead
         * of creating a new instance.
         *
         * @param array $inputArray An array of input key-values
         * @param array $instances    Array of previously created Model instances.
         * @param string $model      Fully qualified class name.
         * @param string $attribute  Name of attribute to set in model.
         * @param \App\Models\Applicant Owner of the object
         */
        function setAttrFromInputNew($inputArray, &$instances, $model, $attribute, $applicant) {
            if (isset($inputArray) && is_array($inputArray)) {
                foreach($inputArray as $key => $value) {
                    $obj = getModelFromArrayOrSetNew($instances, $key, $model, $applicant);
                    $obj->setAttribute($attribute, $value);
                    Debugbar::info($instances);
                }
            }
        }

        /**
         * For each item in an input array, retrieve the modelName instance with
         * id matching input key, and belonging to $applicant, and set $attribute
         * on that model instance with the inputArray value.
         *
         * Retrieved instances are cached in $instances array, so they don't
         * have to be retrieved from database multiple times.
         *
         * @param [type] $inputArray [description]
         * @param [type] $instances  [description]
         * @param [type] $modelName  [description]
         * @param [type] $attribute  [description]
         */
        function setAttrFromInputOld($input, $inputField, &$instances, $modelName, $attribute, $applicant) {
            if (isset($input[$inputField]) &&
                is_array($input[$inputField]) &&
                isset($input[$inputField]['old']) &&
                is_array($input[$inputField]['old']) ) {

                $inputArray = $input[$inputField]['old'];
                Debugbar::info($inputArray);
                foreach($inputArray as $key => $value) {
                    if (isset($instances[$key])) {
                        $obj = $instances[$key];
                    } else {
                        $model = new $modelName;
                        $obj = $model->newQuery()->where('applicant_id', $applicant->id)
                            ->where('id', $key)->first();
                        $instances[$key] = $obj;
                    }
                    if ($obj != null) {
                        $obj->setAttribute($attribute, $value);
                    }
                }
            }
        }

        function get(&$var, $default=null) {
            return isset($var) ? $var : $default;
        }

        // New Entitities
        setAttrFromInputNew(get($input['degree_type']['new']), $newDegrees,'App\Models\Degree', 'degree_type_id', $applicant);
        setAttrFromInputNew(get($input['degree_area']['new']), $newDegrees,'App\Models\Degree', 'area_of_study', $applicant);
        setAttrFromInputNew(get($input['degree_institution']['new']), $newDegrees,'App\Models\Degree', 'institution', $applicant);
        setAttrFromInputNew(get($input['degree_thesis']['new']), $newDegrees,'App\Models\Degree', 'thesis', $applicant);
        setAttrFromInputNew(get($input['degree_start_date']['new']), $newDegrees,'App\Models\Degree', 'start_date', $applicant);
        setAttrFromInputNew(get($input['degree_end_date']['new']), $newDegrees,'App\Models\Degree', 'end_date', $applicant);

        setAttrFromInputNew(get($input['course_name']['new']), $newCourses,'App\Models\Course', 'name', $applicant);
        setAttrFromInputNew(get($input['course_institution']['new']), $newCourses,'App\Models\Course', 'institution', $applicant);
        setAttrFromInputNew(get($input['course_status']['new']), $newCourses,'App\Models\Course', 'course_status_id', $applicant);
        setAttrFromInputNew(get($input['course_start_date']['new']), $newCourses,'App\Models\Course', 'start_date', $applicant);
        setAttrFromInputNew(get($input['course_end_date']['new']), $newCourses,'App\Models\Course', 'end_date', $applicant);

        setAttrFromInputNew(get($input['work_role']['new']), $newWorkExperiences,'App\Models\WorkExperience', 'role', $applicant);
        setAttrFromInputNew(get($input['work_company']['new']), $newWorkExperiences,'App\Models\WorkExperience', 'company', $applicant);
        setAttrFromInputNew(get($input['work_description']['new']), $newWorkExperiences,'App\Models\WorkExperience', 'description', $applicant);
        setAttrFromInputNew(get($input['work_start_date']['new']), $newWorkExperiences,'App\Models\WorkExperience', 'start_date', $applicant);
        setAttrFromInputNew(get($input['work_end_date']['new']), $newWorkExperiences,'App\Models\WorkExperience', 'end_date', $applicant);

        // PreExisting entities
        setAttrFromInputOld($input, 'degree_type', $oldDegrees,'App\Models\Degree', 'degree_type_id', $applicant);
        setAttrFromInputOld($input, 'degree_area', $oldDegrees,'App\Models\Degree', 'area_of_study', $applicant);
        setAttrFromInputOld($input, 'degree_institution', $oldDegrees,'App\Models\Degree', 'institution', $applicant);
        setAttrFromInputOld($input, 'degree_thesis', $oldDegrees,'App\Models\Degree', 'thesis', $applicant);
        setAttrFromInputOld($input, 'degree_start_date', $oldDegrees,'App\Models\Degree', 'start_date', $applicant);
        setAttrFromInputOld($input, 'degree_end_date', $oldDegrees,'App\Models\Degree', 'end_date', $applicant);

        setAttrFromInputOld($input, 'course_name', $oldCourses,'App\Models\Course', 'name', $applicant);
        setAttrFromInputOld($input, 'course_institution', $oldCourses,'App\Models\Course', 'institution', $applicant);
        setAttrFromInputOld($input, 'course_status', $oldCourses,'App\Models\Course', 'course_status_id', $applicant);
        setAttrFromInputOld($input, 'course_start_date', $oldCourses,'App\Models\Course', 'start_date', $applicant);
        setAttrFromInputOld($input, 'course_end_date', $oldCourses,'App\Models\Course', 'end_date', $applicant);

        setAttrFromInputOld($input, 'work_role', $oldWorkExperiences,'App\Models\WorkExperience', 'role', $applicant);
        setAttrFromInputOld($input, 'work_company', $oldWorkExperiences,'App\Models\WorkExperience', 'company', $applicant);
        setAttrFromInputOld($input, 'work_description', $oldWorkExperiences,'App\Models\WorkExperience', 'description', $applicant);
        setAttrFromInputOld($input, 'work_start_date', $oldWorkExperiences,'App\Models\WorkExperience', 'start_date', $applicant);
        setAttrFromInputOld($input, 'work_end_date', $oldWorkExperiences,'App\Models\WorkExperience', 'end_date', $applicant);

        //Delete old entities that weren't resubmitted
        foreach($applicant->degrees as $degree) {
            Debugbar::info($oldCourses);
            Debugbar::info($degree);
            if (!isset($oldDegrees[$degree->id]) || $oldDegrees[$degree->id] === null) {
                Debugbar::info('Deleting degree ' . $degree->id);
                $degree->delete();
            }
        }
        foreach($applicant->courses as $course) {
            if (!isset($oldCourses[$course->id]) || $oldCourses[$course->id] === null) {
                $course->delete();
            }
        }
        foreach($applicant->work_experiences as $work) {
            if (!isset($oldWorkExperiences[$work->id]) || $oldWorkExperiences[$work->id] === null) {
                $work->delete();
            }
        }

        //Save new entities
        foreach($newDegrees as $entity) {
            $entity->save();
        }
        foreach($newCourses as $entity) {
            $entity->save();
        }
        foreach($newWorkExperiences as $entity) {
            $entity->save();
        }

        //Save old entities
        foreach($oldDegrees as $entity) {
            $entity->save();
        }
        foreach($oldCourses as $entity) {
            $entity->save();
        }
        foreach($oldWorkExperiences as $entity) {
            $entity->save();
        }

        //return redirect( route('profile.experience.edit', $applicant) );
        Debugbar::info($input);

        Debugbar::info($this->shiftFirstLevelArrayKeysToBottom($input));

        return view('applicant/profile_02_experience', [
            'applicant' => $applicant,
            'profile' => Lang::get('applicant/profile_experience'),
            'degree_types' => DegreeType::all(),
            'course_status' => CourseStatus::all(),
            'degree_template' => Lang::get('common/degree'),
            'course_template' => Lang::get('common/course'),
            'work_template' => Lang::get('common/work_experience'),
            'form_submit_action' => route('profile.skills.update', $applicant),
        ]);
    }

}
