<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 09 Jul 2018 19:33:41 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Relationship
 * 
 * @property int $relationship_id
 * @property string $relationship_name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $micro_references
 * @property \Illuminate\Database\Eloquent\Collection $relationship_details
 *
 * @package App\Models
 */
class Relationship extends Eloquent
{
	protected $table = 'relationship';
	protected $primaryKey = 'relationship_id';
	public $timestamps = false;

	protected $fillable = [
		'relationship_name'
	];

	public function micro_references()
	{
		return $this->hasMany(\App\Models\MicroReference::class, 'micro_reference_relationship_id');
	}

	public function relationship_details()
	{
		return $this->hasMany(\App\Models\RelationshipDetail::class);
	}
}
