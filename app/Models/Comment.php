<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 *
 * @property int $id
 * @property int $job_poster_id
 * @property int $user_id
 * @property string $comment
 * @property string $location
 * @property \App\Models\Lookup\CommentType $type_id
 * @property \Jenssegers\Date\Date $created_at
 * @property \Jenssegers\Date\Date $updated_at
 *
 * @property \App\Models\JobPoster $job_poster
 * @property \App\Models\User $user
 * @property \App\Models\Lookup\CommentType $comment_type
 */

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['comment', 'location', 'type_id'];

    public function job_poster() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\JobPoster::class);
    }

    public function user() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function comment_type() // phpcs:ignore
    {
        return $this->belongsTo(\App\Models\Lookup\CommentType::class, 'type_id');
    }
}
