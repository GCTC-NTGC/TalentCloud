<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ApplicationStatusDetail
 * 
 * @property int $application_status_details_id
 * @property int $application_status_id
 * @property int $application_status_locale_id
 * @property string $application_status
 *
 * @package App\Models
 */
class ApplicationStatusDetail extends Eloquent
{
	protected $primaryKey = 'application_status_details_id';
	public $timestamps = false;

	protected $casts = [
		'application_status_id' => 'int',
		'application_status_locale_id' => 'int'
	];

	protected $fillable = [
		'application_status_id',
		'application_status_locale_id',
		'application_status'
	];
}
