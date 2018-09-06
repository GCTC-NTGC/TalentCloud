<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;
use App\Models\MicroReference;

/**
 * Class Project
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $start_date
 * @property \Jenssegers\Date\Date $end_date
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $micro_references
 */
class Project extends BaseModel {

    protected $casts = [
        'name' => 'string',
        'start_date' => 'date',
        'end_date' => 'date'
    ];
    protected $fillable = [
        'name',
        'start_date',
        'end_date'
    ];

    public function micro_references() {
        return $this->belongsToMany(\App\Models\MicroReference::class);
    }
}
