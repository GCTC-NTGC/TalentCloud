<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Resource;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

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
        $resources = [];

        // Iterate through resource files, and push link type array into resources array.
        $files = Resource::all();
        foreach ($files as $file) {
            array_push($resources, [
              'link' => Storage::url($file->file),
              'title' => '',
              'text' => $file->name,
            ]);
        }

        // Sort the list alphabetically.
        usort($resources, function ($filenameA, $filenameB) {
            return strcmp($filenameA['text'], $filenameB['text']);
        });

        return view('common/resources', [
          // Localized strings.
          'resources_template' => $resources_template,
          // List of resource downloads.
          'resources' => $resources,
        ]);
    }
}
