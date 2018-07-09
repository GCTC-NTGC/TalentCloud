<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Division
 * 
 * @property int $division_id
 * @property string $division_common_name
 *
 * @package App\Models
 */
class Division extends Eloquent
{
	protected $table = 'division';
	protected $primaryKey = 'division_id';
	public $timestamps = false;

	protected $fillable = [
		'division_common_name'
	];
}
