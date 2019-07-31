<?php

namespace App\Http\Controllers;

use App\Models\Degree;
use Illuminate\Http\Request;

class DegreeController extends Controller
{
    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Http\Request $request Incoming Request.
     * @param  \App\Models\Degree       $degree  Incoming Degree.
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Degree $degree)
    {
        $this->authorize('delete', $degree);
        $degree->delete();

        if ($request->ajax()) {
            return [
                'message' => 'Degree deleted',
            ];
        }

        return back();
    }
}
