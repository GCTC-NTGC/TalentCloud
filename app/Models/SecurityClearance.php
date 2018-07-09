<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SecurityClearance
 * 
 * @property int $security_clearance_id
 * @property string $security_clearance_common_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $security_clearance_details
 *
 * @package App\Models
 */
class SecurityClearance extends Eloquent
{
	protected $table = 'security_clearance';
	protected $primaryKey = 'security_clearance_id';
	public $timestamps = false;

	protected $fillable = [
		'security_clearance_common_name'
	];

	public function security_clearance_details()
	{
		return $this->hasMany(\App\Models\SecurityClearanceDetail::class);
	}
}
