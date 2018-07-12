<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class TeamCulture
 * 
 * @property int $id
 * @property int $team_size
 * @property string $gc_directory_url
 * @property int $manager_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Manager $manager
 * @property \Illuminate\Database\Eloquent\Collection $team_culture_translations
 *
 * @package App\Models
 */
class TeamCulture extends Eloquent
{
	protected $casts = [
		'team_size' => 'int',
		'manager_id' => 'int'
	];

	protected $fillable = [
		'team_size',
		'gc_directory_url',
		'manager_id'
	];

	public function manager()
	{
		return $this->belongsTo(\App\Models\Manager::class);
	}

	public function team_culture_translations()
	{
		return $this->hasMany(\App\Models\TeamCultureTranslation::class);
	}
}
