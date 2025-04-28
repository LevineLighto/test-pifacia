<?php

use App\Exceptions\FailedException;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(using: function () {
        Route::prefix('api')
            ->middleware(['web'])
            ->group(base_path('routes/api.php'));
            
        Route::middleware(['web'])
            ->group(base_path('routes/web.php'));
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
        $middleware->redirectGuestsTo(fn (Request $request) => route('index'));
        $middleware->redirectUsersTo(fn (Request $request) => route('app.dashboard.index'));
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
