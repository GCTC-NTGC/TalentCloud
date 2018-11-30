<?php

namespace App\Http\ViewComposers;

use Illuminate\View\View;
use Illuminate\Support\Facades\Lang;
use App\Models\Lookup\ReviewStatus;
use App\Models\Lookup\ReviewDecision;

class ApplicationReviewComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('review_statuses', ReviewStatus::all());
        $view->with('review_decisions', ReviewDecision::all());
        $view->with('review_template', Lang::get('manager/application_review'));
    }
}
