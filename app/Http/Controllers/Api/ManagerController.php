<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateManagerApi;
use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ManagerController extends Controller
{
    /**
     * Class constructor.
     */
    public function __construct()
    {
        // This applies the appropriate policy to each resource route.
        $this->authorizeResource(Manager::class, 'manager');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // TODO: complete.
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // TODO: complete.
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manager $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function show(Manager $manager)
    {
        return new JsonResource($manager);
    }

    /**
     * Display the Manager for the current logged in user.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAuthenticated()
    {
        $user = Auth::user();
        if ($user !== null && $user->manager !== null) {
            return new JsonResource($user->manager);
        }
        return response()->json([]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateManagerApi $request Incoming Form Request.
     * @param  \App\Models\Manager                 $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateManagerApi $request, Manager $manager)
    {
        $validated = $request->validated();
        $manager->fill($validated);
        $manager->save();
        return new JsonResource($manager);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manager $manager Incoming Manager.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Manager $manager)
    {
        // TODO: complete.
    }
}
