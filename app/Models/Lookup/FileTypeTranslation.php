<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use App\Models\BaseModel;

/**
 * Class FileTypeTranslation
 *
 * @property int $id
 * @property int $file_type_id
 * @property string $locale
 * @property string $value
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\Lookup\FileType $file_type
 */
class FileTypeTranslation extends BaseModel
{

    protected $casts = [
        'file_type_id' => 'int'
    ];
    protected $fillable = [];

    public function file_type()
    {
        return $this->belongsTo(\App\Models\Lookup\FileType::class);
    }
}
