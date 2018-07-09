<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Branch
 * 
 * @property int $branch_id
 * @property string $branch_common_name
 *
 * @package App\Models
 */
class Branch extends Eloquent
{
	protected $table = 'branch';
	protected $primaryKey = 'branch_id';
	public $timestamps = false;

	protected $fillable = [
		'branch_common_name'
	];
}
