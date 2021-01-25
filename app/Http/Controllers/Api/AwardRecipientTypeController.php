<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lookup\AwardRecipientType;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardRecipientTypeController extends Controller
{
    /**
     * Return all award recipient types as an array
     *
     * @return mixed
     */
    public function index()
    {
        return JsonResource::collection(AwardRecipientType::all());
    }
}
