<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BaseContent
 * 
 * @property int $base_content_id
 * @property int $base_content_type_id
 * @property string $base_content_key
 * @property string $base_content_value
 * @property int $base_content_locale_id
 *
 * @package App\Models
 */
class BaseContent extends Eloquent
{
	protected $table = 'base_content';
	protected $primaryKey = 'base_content_id';
	public $timestamps = false;

	protected $casts = [
		'base_content_type_id' => 'int',
		'base_content_locale_id' => 'int'
	];

	protected $fillable = [
		'base_content_type_id',
		'base_content_key',
		'base_content_value',
		'base_content_locale_id'
	];
}
