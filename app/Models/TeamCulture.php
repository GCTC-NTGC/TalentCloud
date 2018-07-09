<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class TeamCulture
 * 
 * @property int $id
 * @property int $team_size
 * @property string $gc_directory_url
 * 
 * @property \Illuminate\Database\Eloquent\Collection $manager_profile_to_team_cultures
 *
 * @package App\Models
 */
class TeamCulture extends Eloquent
{
	protected $table = 'team_culture';
	public $timestamps = false;

	protected $casts = [
		'team_size' => 'int'
	];

	protected $fillable = [
		'team_size',
		'gc_directory_url'
	];

	public function manager_profile_to_team_cultures()
	{
		return $this->hasMany(\App\Models\ManagerProfileToTeamCulture::class);
	}
}
