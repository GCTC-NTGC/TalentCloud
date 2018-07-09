<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class RelationshipDetail
 * 
 * @property int $relationship_details_id
 * @property int $relationship_id
 * @property int $locale_id
 * @property string $relationship_details_name
 * 
 * @property \App\Models\Relationship $relationship
 * @property \App\Models\Locale $locale
 *
 * @package App\Models
 */
class RelationshipDetail extends Eloquent
{
	protected $primaryKey = 'relationship_details_id';
	public $timestamps = false;

	protected $casts = [
		'relationship_id' => 'int',
		'locale_id' => 'int'
	];

	protected $fillable = [
		'relationship_id',
		'locale_id',
		'relationship_details_name'
	];

	public function relationship()
	{
		return $this->belongsTo(\App\Models\Relationship::class);
	}

	public function locale()
	{
		return $this->belongsTo(\App\Models\Locale::class);
	}
}
