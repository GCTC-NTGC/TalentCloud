<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Lang;

class ResourcesController extends Controller
{

    /**
     * Display the resources template
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $resources_template = Lang::get('common/resources');
        $resources_list = [];
        return view('common/resources', [
          // Localized strings.
          'resources_template' => $resources_template,
          // List of resource downloads.
          'resources_list' => $resources_list,
        ]);
    }
}
