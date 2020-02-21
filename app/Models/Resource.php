<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;
use Illuminate\Support\Facades\Storage;

/**
 * Class Resource
 *
 * @property int id
 * @property string name
 * @property string file
 */

class Resource extends Model
{
    use CrudTrait;
    use HasTranslations;

    /**
     * Delete file in resources folder
     *
     */
    public static function boot(): void
    {
        parent::boot();
        static::deleting(function ($obj): void {
            Storage::disk('public')->delete($obj->file);
        });
    }

    /**
     * The model's attibutes that admin cannot change.
     *
     * @var array
     */
    protected $guarded = ['id'];

    /**
     * The model's attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'file'];

    /**
     * The model's attributes that are translated.
     *
     * @var array
     */
    protected $translatable = ['name'];

    /**
     * Set the value of file name attribute in DB and upload file to disk.
     *
     * @param string $value Incoming value for 'file' attribute.
     */
    public function setFileAttribute(string $value): void
    {
        $request = \Request::instance();

        // Check if a new file has been uploaded if not then save value to file attribute
        if ($request->hasFile('file')) {
            $this->uploadFileToDisk($value, 'file', 'public', 'resources');
        } else {
            $this->attributes['file'] = $value;
        }
    }
}
