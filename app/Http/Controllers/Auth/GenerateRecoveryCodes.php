<?php

namespace App\Http\Controllers\Auth;

use PragmaRX\Recovery\Recovery;
use Jenssegers\Date\Date;
use App\Models\User;

trait GenerateRecoveryCodes
{
    protected function generateCodesForUser(User $user)
    {
        $recovery = new Recovery();
        $codes = $recovery
            ->setCount(8)     // Generate 8 codes
            ->setBlocks(2)    // Every code must have 2 blocks
            ->setChars(8)    // Each block must have 8 chars
            ->toArray();
        $user->recovery_codes = $codes;
        $user->recovery_codes_generation_date = Date::now();
        $user->save();
    }
}
