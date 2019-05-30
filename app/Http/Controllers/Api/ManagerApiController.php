<?php

namespace App\Http\Controllers\Api;

use App\Models\Manager;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateManager;

class ManagerApiController extends Controller
{

    public function __construct()
    {
        // This applies the appropriate policy to each resource route
        $this->authorizeResource(Manager::class, 'manager');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //TODO:
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //TODO:
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function show(Manager $manager)
    {
        return $manager->toApiArray();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Http\Requests\UpdateManager  $request
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateManager $request, Manager $manager)
    {
        $request->validated();
        $manager->fill($request->input());
        $manager->save();
        return $manager->toApiArray();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Manager  $manager
     * @return \Illuminate\Http\Response
     */
    public function destroy(Manager $manager)
    {
        //TODO:
    }
}
