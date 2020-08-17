<?php

namespace App\Exceptions;

use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
        'current_password',
        'new_password',
        'new_password_confirmation',
    ];

    /**
     * OVERRIDE
     * A list of the internal exception types that should not be reported.
     *
     * @var array
     */
    protected $internalDontReport = [
        AuthenticationException::class,
        AuthorizationException::class,
        HttpResponseException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(\Exception $exception)
    {
        if ($exception instanceof TokenMismatchException) {
            $logData = [
                'requestToken' => request()->header('x-csrf-token'),
                'sessionToken' => session()->token(),
                'session' => session()->all(),
                'user' => request()->user(),
                'requestUrl' => request()->url()
            ];
            $message = '419 CSRF Token Mismatch. ' . collect($logData)->toJson();
            Log::debug($message);
        }

        parent::report($exception);
    }

    /**
     * OVERRIDE
     * Get the default context variables for logging.
     *
     * @return array
     */
    protected function context()
    {
        try {
            return array_filter([
                'userId' => Auth::id(),
                'url' => Request::path(),
                'method' => Request::method(),
                'referer' => Request::header('referer', '')
            ]);
        } catch (\Throwable $e) {
            return [];
        }
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, \Exception $exception)
    {
        // Redirect upper case URLs to lower case route.
        $url = $request->url();
        $loweredCaseUrl = strtolower($url);
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException && $url !== $loweredCaseUrl) {
            return redirect($loweredCaseUrl);
        }

        // Laravel will render out the error page by default even for JSON
        // requests... this will return a standardized JSON response with a 403
        // if unauthorized.
        if ($exception instanceof AuthorizationException && $request->wantsJson()) {
            return response()->json(['message' => $exception->getMessage()], 403);
        }
        if ($exception instanceof AdminException) {
            return $exception->render($request);
        }
        if ($exception instanceof TwoFactorRequiredException) {
            return $exception->render($request);
        }
        if ($exception instanceof TokenMismatchException) {
            $newMessage = $exception->getMessage() . ' ' . Lang::get('errors.refresh_page');
            $modifiedException = new TokenMismatchException($newMessage, $exception->getCode(), $exception);
            return parent::render($request, $modifiedException);
        }
        if ($exception instanceof StateMachineException) {
            return parent::render($request, new HttpException(400, $exception->getMessage()));
        }
        if ($exception instanceof SendEmailException) {
            return parent::render($request, new HttpException(400, $exception->getMessage()));
        }
        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        $loginRoute = ($exception->redirectTo() !== null && $exception->redirectTo() !== '')
            ? $exception->redirectTo()
            : route('login');
        return redirect()->guest($loginRoute);
    }

    /**
     * OVERRIDE
     * Render the given HttpException.
     *
     * @param  \Symfony\Component\HttpKernel\Exception\HttpExceptionInterface  $e
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function renderHttpException(HttpExceptionInterface $e)
    {
        if (!view()->exists("errors.{$e->getStatusCode()}")) {
            return response()->view('errors.default', [
                'exception' => $e,
                'goc' => Lang::get('common/goc'),
                'alert' => Lang::get('common/alert'),
                'error' => [
                    'title' => 'Error'
                ]
            ], $e->getStatusCode(), $e->getHeaders());
        }
        return parent::renderHttpException($e);
    }
}
