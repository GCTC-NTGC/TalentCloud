<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;
use Astrotomic\Translatable\Translatable as Translatable;

/**
 * Class FileType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \Illuminate\Database\Eloquent\Collection $file_type_translations
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 *
 * Localized Properties:
 * @property string $value
 */
class FileType extends BaseModel
{

    use Translatable;

    public $translatedAttributes = ['value'];
    protected $fillable = [];

    public function file_type_translations() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\Lookup\FileTypeTranslation::class);
    }

    public function work_samples() //phpcs:ignore
    {
        return $this->hasMany(\App\Models\WorkSample::class);
    }
}
