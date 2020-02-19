<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Backpack\CRUD\app\Models\Traits\CrudTrait;
use Backpack\CRUD\app\Models\Traits\SpatieTranslatable\HasTranslations;

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
     */
    public function setFileAttribute($value)
    {
        $this->uploadFileToDisk($value, 'file', 'public', 'resources');
    }
}
