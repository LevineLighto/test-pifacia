<?php

use App\Exceptions\FailedException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(using: function () {
        Route::prefix('api')
            ->middleware(['web'])
            ->group(base_path('routes/api.php'));
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'api/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (FailedException $exception) {
            Log::debug($exception);
            return failed($exception->getMessage(), $exception->getCode());
        });

        $exceptions->render(function (HttpException $exception) {
            Log::debug($exception);
            return failed($exception->getMessage(), $exception->getStatusCode());
        });

        $exceptions->render(function (ValidationException $exception) {
            Log::debug($exception);
            return failed($exception->getMessage(), 400);
        });

        $exceptions->render(function (Exception $exception) {
            Log::debug($exception);
            return failed('Something unexpected happened!');
        });
    })->create();
