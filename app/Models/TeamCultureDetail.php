<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class TeamCultureDetail
 * 
 * @property int $id
 * @property int $team_culture_id
 * @property int $locale_id
 * @property string $narrative_text
 * @property string $operating_context
 * @property string $what_we_value
 * @property string $how_we_work
 *
 * @package App\Models
 */
class TeamCultureDetail extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'team_culture_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'team_culture_id',
		'locale_id',
		'narrative_text',
		'operating_context',
		'what_we_value',
		'how_we_work'
	];
}
