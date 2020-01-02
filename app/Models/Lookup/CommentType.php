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
 *
 * @property \Illuminate\Database\Eloquent\Collection $comments
 */

class CommentType extends Model
{
    protected $fillable = [];

    public function comments() // phpcs:ignore
    {
        return $this->hasMany(\App\Models\Comment::class, 'type_id');
    }
}
