<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class FileTypeDetail
 * 
 * @property int $file_type_details_id
 * @property int $file_type_id
 * @property int $locale_id
 * @property string $file_type_details_name
 * 
 * @property \App\Models\FileType $file_type
 * @property \App\Models\Locale $locale
 *
 * @package App\Models
 */
class FileTypeDetail extends Eloquent
{
	protected $primaryKey = 'file_type_details_id';
	public $timestamps = false;

	protected $casts = [
		'file_type_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'file_type_id',
		'locale_id',
		'file_type_details_name'
	];

	public function file_type()
	{
		return $this->belongsTo(\App\Models\FileType::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}
}
