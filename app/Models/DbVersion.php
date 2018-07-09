<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class DbVersion
 * 
 * @property string $version
 *
 * @package App\Models
 */
class DbVersion extends Eloquent
{
	protected $table = 'db_version';
	public $incrementing = false;
	public $timestamps = false;

	protected $fillable = [
		'version'
	];
}
