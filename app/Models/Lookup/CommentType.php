<?php

namespace App\Models\Lookup;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CommentType
 *
 * @property int $id
 * @property string $name
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 */

class CommentType extends Model
{
    protected $fillable = [];
}
