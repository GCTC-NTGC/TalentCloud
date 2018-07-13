<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BaseContent
 * 
 * @property int $id
 * @property int $base_content_type_id
 * @property string $key
 * @property string $value
 * @property string $locale
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class BaseContent extends Eloquent
{
	protected $table = 'base_content';

	protected $casts = [
		'base_content_type_id' => 'int'
	];

	protected $fillable = [];
}
