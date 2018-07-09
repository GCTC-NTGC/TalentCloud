<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SecurityClearanceDetail
 * 
 * @property int $security_clearance_details_id
 * @property int $security_clearance_details_locale_id
 * @property int $security_clearance_id
 * @property string $security_clearance_details_name
 * 
 * @property \App\Models\SecurityClearance $security_clearance
 *
 * @package App\Models
 */
class SecurityClearanceDetail extends Eloquent
{
	protected $primaryKey = 'security_clearance_details_id';
	public $timestamps = false;

	protected $casts = [
		'security_clearance_details_locale_id' => 'int',
		'security_clearance_id' => 'int'
	];

	protected $fillable = [
		'security_clearance_details_locale_id',
		'security_clearance_id',
		'security_clearance_details_name'
	];

	public function security_clearance()
	{
		return $this->belongsTo(\App\Models\SecurityClearance::class);
	}
}
