<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class JobTermTranslation
 * 
 * @property int $id
 * @property int $job_term_id
 * @property string $value
 * @property string $locale
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\JobTerm $job_term
 */
class JobTermTranslation extends Eloquent
{
	protected $casts = [
		'job_term_id' => 'int'
	];

	protected $fillable = [];

	public function job_term()
	{
		return $this->belongsTo(\App\Models\JobTerm::class);
	}
}
