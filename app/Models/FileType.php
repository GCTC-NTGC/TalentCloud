<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class FileType
 * 
 * @property int $file_type_id
 * @property string $file_type
 * 
 * @property \Illuminate\Database\Eloquent\Collection $file_type_details
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 *
 * @package App\Models
 */
class FileType extends Eloquent
{
	protected $table = 'file_type';
	protected $primaryKey = 'file_type_id';
	public $timestamps = false;

	protected $fillable = [
		'file_type'
	];

	public function file_type_details()
	{
		return $this->hasMany(\App\Models\FileTypeDetail::class);
	}

	public function work_samples()
	{
		return $this->hasMany(\App\Models\WorkSample::class);
	}
}
