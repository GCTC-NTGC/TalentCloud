<?php

namespace App\Exceptions\Api;

use Exception;
use Illuminate\Support\Facades\Lang;

class BadUrlException extends Exception
{
    /**
     * Constructor function.
     *
     * @param string     $message  Custom error message.
     * @param integer    $code     HTTP code to return.
     * @param \Throwable $previous The last exception thrown.
     *
     * @return void
     */
    public function __construct(string $message = '', int $code = 0, ?\Throwable $previous = null)
    {
        $message = Lang::get('errors.bad_url');
        $code = 422; // Unprocessable entity.
        parent::__construct($message, $code, $previous);
    }

    /**
     * Render the exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request Incoming request object.
     * @return \Illuminate\Http\Response
     */
    public function render(\Illuminate\Http\Request $request)
    {
        return response()->json(
            [
                'message' => $this->getMessage()
            ],
            $this->getCode()
        );
    }
}
