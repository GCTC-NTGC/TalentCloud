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
     * @var Request
     */
    protected $request;

    /**
     * Initialize a new composer instance.
     *
     * @param Request $request Request being made.
     * @return void
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * Bind data to the view.
     *
     * @param View $view View being rendered.
     *
     * @return void
     */
    public function compose(View $view)
    {
        $segments = $this->parseSegments();
        $breadcrumbs_lang = Lang::get('common/breadcrumbs')['applicant'];

        if (WhichPortal::isManagerPortal()) {
            $segments = $segments->slice(1);
            $breadcrumbs_lang = Lang::get('common/breadcrumbs')['manager'];
        }

        $view->with('breadcrumbs', $segments);
        $view->with('breadcrumbs_lang', $breadcrumbs_lang);
    }

    /**
     * Parse the request route segments.
     *
     * @return Collection
     */
    protected function parseSegments()
    {
        return collect($this->request->segments())->mapWithKeys(function ($segment, $key) {
            return [
                $segment => implode('/', array_slice($this->request->segments(), 0, $key + 1)),
            ];
        });
    }
}
