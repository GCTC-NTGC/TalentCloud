<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class UserManagerProfileDetail
 * 
 * @property int $user_manager_profile_details_id
 * @property int $locale_id
 * @property string $user_manager_profile_details_aboutme
 * @property string $user_manager_profile_details_proud
 * @property string $user_manager_profile_details_branch
 * @property string $user_manager_profile_details_division
 * @property string $user_manager_profile_details_position
 * @property string $user_manager_profile_details_lead_style
 * @property string $user_manager_profile_details_emp_learn
 * @property string $user_manager_profile_details_expectations
 * @property int $user_manager_profile_id
 * @property string $user_manager_profile_review_options
 * @property string $user_manager_profile_staylate
 * @property string $user_manager_profile_engage
 * @property string $user_manager_profile_devops
 * @property string $user_manager_profile_lvwRequests
 * @property string $user_manager_profile_work_experience
 * @property string $user_manager_profile_education
 * 
 * @property \App\Models\UserManagerProfile $user_manager_profile
 *
 * @package App\Models
 */
class UserManagerProfileDetail extends Eloquent
{
	protected $primaryKey = 'user_manager_profile_details_id';
	public $timestamps = false;

	protected $casts = [
		'locale_id' => 'int',
		'user_manager_profile_id' => 'int'
	];

	protected $fillable = [
		'locale_id',
		'user_manager_profile_details_aboutme',
		'user_manager_profile_details_proud',
		'user_manager_profile_details_branch',
		'user_manager_profile_details_division',
		'user_manager_profile_details_position',
		'user_manager_profile_details_lead_style',
		'user_manager_profile_details_emp_learn',
		'user_manager_profile_details_expectations',
		'user_manager_profile_id',
		'user_manager_profile_review_options',
		'user_manager_profile_staylate',
		'user_manager_profile_engage',
		'user_manager_profile_devops',
		'user_manager_profile_lvwRequests',
		'user_manager_profile_work_experience',
		'user_manager_profile_education'
	];

	public function user_manager_profile()
	{
		return $this->belongsTo(\App\Models\UserManagerProfile::class);
	}
}
