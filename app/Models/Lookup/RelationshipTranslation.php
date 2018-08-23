<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class RelationshipTranslation
 *
 * @property int $id
 * @property int $relationship_id
 * @property string $locale
 * @property string $value
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Lookup\Relationship $relationship
 */
class RelationshipTranslation extends Eloquent
{
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\Relationship $relationship
 */
class RelationshipTranslation extends BaseModel
{
    >>>>>>> dev

    protected $casts = [
        'relationship_id' => 'int'
    ];
    protected $fillable = [];

    public function relationship()
    {
        return $this->belongsTo(\App\Models\Lookup\Relationship::class);
    }
}
