<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Support\Facades\Log;

class AdminException extends Exception
{
    /**
     * @var $links A collection of links to pass to the view.
     */
    private $links;

    /**
     * Custom constructor to add additional elements to render view.
     *
     * @param string     $message  Custom error message.
     * @param integer    $code     HTTP code to return.
     * @param \Throwable $previous The last exception thrown.
     * @param string[]   $links    A collection of links to send to the view.
     *
     * @return void
     */
    public function __construct(string $message, int $code, ?\Throwable $previous = null, array $links = null)
    {
        $this->links = $links;
        parent::__construct($message, $code, $previous);
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function render(\Illuminate\Http\Request $request)
    {
        return response()->view(
            'errors/admin',
            [
                'exception' => $this,
                'error' => [
                    "title" => "Error"
                ],
                'links' => $this->links
            ],
            500
        );
    }

    /**
     * Override, custom exception doesn't return a status code.
     *
     * @return mixed
     */
    public function getStatusCode()
    {
        return 500;
    }
}
