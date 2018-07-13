<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkSample
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $date_created
 * @property int $file_type_id
 * @property string $url
 * @property string $story
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 */
class WorkSample extends Eloquent
{
	protected $casts = [
		'file_type_id' => 'int'
	];

	protected $dates = [
		'date_created'
	];

	protected $fillable = [
		'name',
		'date_created',
		'file_type_id',
		'url',
		'story'
	];

	public function file_type()
	{
		return $this->belongsTo(\App\Models\FileType::class);
	}

	public function application_work_samples()
	{
		return $this->hasMany(\App\Models\ApplicationWorkSample::class);
	}
}
