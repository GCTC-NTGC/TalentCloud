<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class SecurityClearanceTranslation
 * 
 * @property int $id
 * @property string $locale
 * @property int $security_clearance_id
 * @property string $value
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\SecurityClearance $security_clearance
 *
 * @package App\Models
 */
class SecurityClearanceTranslation extends Eloquent
{
	protected $casts = [
		'security_clearance_id' => 'int'
	];

	protected $fillable = [
		'locale',
		'security_clearance_id',
		'value'
	];

	public function security_clearance()
	{
		return $this->belongsTo(\App\Models\SecurityClearance::class);
	}
}
