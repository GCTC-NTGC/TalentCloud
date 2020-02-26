<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

/**
 * Class Department
 * @property int $id
 * @property string $key
 * @property int $owner_user_role_id
 * @property int $from_job_poster_status_id
 * @property int $to_job_poster_status_id
 * @property array $metadata
 *
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\UserRole $owner_user_role
 * @property \App\Models\Lookup\JobPosterStatus $from
 * @property \App\Models\Lookup\JobPosterStatus $to
 *
 * Localized Properties:
 * @property string $name
 */
class JobPosterStatusTransition extends BaseModel
{
    use CrudTrait;
    use HasTranslations;

    /**
     * All the fields must be fillable by admin portal
     *
     * @var string[]
     */
    protected $fillable = [
        'key',
        'owner_user_role_id',
        'from_job_poster_status_id',
        'to_job_poster_status_id',
        'metadata',
        'name'
    ];

    /**
     * @var string[] $casts
     */
    protected $casts = [
        'metadata' => 'array'
    ];

    /**
     * @var string[] $translatable
     * */
    public $translatable = [
        'name',
    ];

    /**
     * Allows the Backpack admin portal to edit json fields.
     *
     * @var string
     */
    public $fakeColumns = ['metadata'];

    public function owner_user_role() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\UserRole::class, 'owner_user_role_id');
    }

    public function from() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobPosterStatus::class, 'from_job_poster_status_id');
    }

    public function to() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\JobPosterStatus::class, 'to_job_poster_status_id');
    }
}
