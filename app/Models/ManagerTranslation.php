<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ManagerTranslation
 * 
 * @property int $id
 * @property string $locale
 * @property string $aboutme
 * @property string $greatest_accomplishment
 * @property string $branch
 * @property string $division
 * @property string $position
 * @property string $leadership_style
 * @property string $employee_learning
 * @property string $expectations
 * @property int $manager_id
 * @property string $review_options
 * @property string $staylate
 * @property string $engage
 * @property string $opportunities
 * @property string $low_value_work_requests
 * @property string $work_experience
 * @property string $education
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Manager $manager
 */
class ManagerTranslation extends Eloquent {

    protected $casts = [
        'manager_id' => 'int'
    ];
    protected $fillable = [
        'aboutme',
        'greatest_accomplishment',
        'branch',
        'division',
        'position',
        'leadership_style',
        'employee_learning',
        'expectations',
        'review_options',
        'staylate',
        'engage',
        'opportunities',
        'low_value_work_requests',
        'work_experience',
        'education'
    ];

    public function manager() {
        return $this->belongsTo(\App\Models\Manager::class);
    }

}
