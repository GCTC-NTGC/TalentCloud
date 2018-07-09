<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class WorkSample
 * 
 * @property int $work_sample_id
 * @property string $work_sample_name
 * @property \Carbon\Carbon $work_sample_date_created
 * @property int $file_type_id
 * @property string $work_sample_url
 * @property string $work_sample_story
 * 
 * @property \App\Models\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 *
 * @package App\Models
 */
class WorkSample extends Eloquent
{
	protected $table = 'work_sample';
	protected $primaryKey = 'work_sample_id';
	public $timestamps = false;

	protected $casts = [
		'file_type_id' => 'int'
	];

	protected $dates = [
		'work_sample_date_created'
	];

	protected $fillable = [
		'work_sample_name',
		'work_sample_date_created',
		'file_type_id',
		'work_sample_url',
		'work_sample_story'
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
