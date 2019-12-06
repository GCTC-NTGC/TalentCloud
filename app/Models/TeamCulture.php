<?php

namespace App\Models;

use App\Models\BaseModel;
use Spatie\Translatable\HasTranslations;

/**
 * Class TeamCulture
 *
 * @property int $id
 * @property int $team_size
 * @property string $gc_directory_url
 * @property int $manager_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Manager $manager
 *
 * Localized Properties:
 * @property string $narrative_text
 * @property string $operating_context
 * @property string $what_we_value
 * @property string $how_we_work
 */

class TeamCulture extends BaseModel
{
    use HasTranslations;

    public $translatable = [
        'narrative_text',
        'operating_context',
        'what_we_value',
        'how_we_work'
    ];

    protected $casts = [
        'team_size' => 'int',
        'manager_id' => 'int'
    ];
    protected $fillable = [
        'team_size',
        'gc_directory_url'
    ];

    public function manager()
    {
        return $this->belongsTo(\App\Models\Manager::class);
    }
}
