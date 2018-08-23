<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:28 +0000.
 */

namespace App\Models;

/**
 * Class TeamCulture
 *
 * @property int $id
 * @property int $team_size
 * @property string $gc_directory_url
 * @property int $manager_id
<<<<<<< HEAD
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
=======
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
>>>>>>> dev
 *
 * @property \App\Models\Manager $manager
 * @property \Illuminate\Database\Eloquent\Collection $team_culture_translations
 *
 * Localized Properties:
 * @property string $narrative_text
 * @property string $operating_context
 * @property string $what_we_value
 * @property string $how_we_work
 */
<<<<<<< HEAD
class TeamCulture extends Eloquent
{
=======
class TeamCulture extends BaseModel {
>>>>>>> dev

    use \Dimsav\Translatable\Translatable;

    public $translatedAttributes = ['narrative_text', 'operating_context', 'what_we_value', 'how_we_work'];
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

    public function team_culture_translations()
    {
        return $this->hasMany(\App\Models\TeamCultureTranslation::class);
    }
}
