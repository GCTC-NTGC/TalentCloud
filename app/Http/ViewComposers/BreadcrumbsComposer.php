<?php

namespace App\Http\ViewComposers;

use Facades\App\Services\WhichPortal;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;

class BreadcrumbsComposer
{
    /**
     * The request instance.
     *
     * @var \Illuminate\Http\Request
     */
    protected $request;

    /**
     * Initialize a new composer instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Bind data to the view.
     *
     * @param  \Illuminate\View\View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $segments = $this->parseSegments();
        $breadcrumbs_lang = Lang::get('common/breadcrumbs');
        $portal_specific_lang = [];
        $view->with('breadcrumbs_lang', $breadcrumbs_lang);

        if (WhichPortal::isManagerPortal()) {
            $segments = $segments->slice(1);
            $portal_specific_lang = Lang::get('common/breadcrumbs')['manager'];
        } elseif (WhichPortal::isHrPortal()) {
            $segments = $segments->slice(1);
            $portal_specific_lang = Lang::get('common/breadcrumbs')['hr'];
        }

        $view->with('breadcrumbs', $segments);
        $view->with('portal_specific_lang', $portal_specific_lang);
    }

    /**
     * Parse the request route segments.
     *
     * @return \Illuminate\Support\Collection
     */
    protected function parseSegments()
    {
        return collect($this->request->segments())->mapWithKeys(function ($segment, $key) {
            // Replaces any segment ID in url with the objects name or title.
            if ($this->request->jobPoster && $this->request->jobPoster->id == $segment) {
                $segment = $this->request->jobPoster->title;
            }
            if ($this->request->manager && $this->request->manager->id == $segment) {
                $segment = $this->request->manager->user->full_name;
            }
            if ($this->request->applicant && $this->request->applicant->id == $segment) {
                $segment = $this->request->applicant->user->full_name;
            }
            if ($this->request->application && $this->request->application->id == $segment) {
                $segment = $this->request->application->user_name;
            }
            return [
                $segment => implode('/', array_slice($this->request->segments(), 0, $key + 1)),
            ];
        });
    }
}
