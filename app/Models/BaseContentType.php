<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BaseContentType
 * 
 * @property int $base_content_type_id
 * @property string $base_content_type_name
 *
 * @package App\Models
 */
class BaseContentType extends Eloquent
{
	protected $table = 'base_content_type';
	protected $primaryKey = 'base_content_type_id';
	public $timestamps = false;

	protected $fillable = [
		'base_content_type_name'
	];
}
