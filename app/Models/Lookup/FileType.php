<?php

/**
 * Created by Reliese Model.
 * Date: Thu, 12 Jul 2018 22:39:27 +0000.
 */

namespace App\Models\Lookup;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class FileType
 * 
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \Illuminate\Database\Eloquent\Collection $file_type_translations
 * @property \Illuminate\Database\Eloquent\Collection $work_samples
 * 
 * Localized Properties:
 * @property string $value
 */
class FileType extends Eloquent
{
    use \Dimsav\Translatable\Translatable;
    public $translatedAttributes = ['value'];
	protected $fillable = [];

	public function file_type_translations()
	{
		return $this->hasMany(\App\Models\Lookup\FileTypeTranslation::class);
	}

	public function work_samples()
	{
		return $this->hasMany(\App\Models\WorkSample::class);
	}
}
