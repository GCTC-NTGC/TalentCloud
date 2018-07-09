<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class BranchDetail
 * 
 * @property int $branch_details_id
 * @property int $branch_id
 * @property int $branch_details_locale_id
 * @property string $branch_details_name
 *
 * @package App\Models
 */
class BranchDetail extends Eloquent
{
	protected $primaryKey = 'branch_details_id';
	public $timestamps = false;

	protected $casts = [
		'branch_id' => 'int',
		'branch_details_locale_id' => 'int'
	];

	protected $fillable = [
		'branch_id',
		'branch_details_locale_id',
		'branch_details_name'
	];
}
