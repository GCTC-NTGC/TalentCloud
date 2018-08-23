<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class WorkSample
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $date_created
 * @property int $file_type_id
 * @property string $url
 * @property string $story
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 *
 * @property \App\Models\Lookup\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 */
class WorkSample extends Eloquent
{
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 * 
 * @property \App\Models\Lookup\FileType $file_type
 * @property \Illuminate\Database\Eloquent\Collection $application_work_samples
 */
class WorkSample extends BaseModel {
>>>>>>> dev

    protected $casts = [
        'file_type_id' => 'int'
    ];
    protected $dates = [
        'date_created'
    ];
    protected $fillable = [
        'name',
        'date_created',
        'file_type_id',
        'url',
        'story'
    ];

    public function file_type()
    {
        return $this->belongsTo(\App\Models\Lookup\FileType::class);
    }

    public function application_work_samples()
    {
        return $this->hasMany(\App\Models\ApplicationWorkSample::class);
    }
}
