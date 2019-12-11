<?php

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class CourseStatus
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $courses
 */
class CourseStatus extends BaseModel
{
    protected $table = 'course_status';
    protected $fillable = [];

    public function courses(){
        return $this->hasMany(\App\Models\Course::class);
    }
}
