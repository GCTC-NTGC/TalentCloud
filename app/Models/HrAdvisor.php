<?php

namespace App\Models;

/**
 * Class HrAdvisor
 *
 * @property \App\Models\User $user
 *
 */
class HrAdvisor extends BaseModel
{
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
