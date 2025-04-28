<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('auth.')->group(function () {

    Route::post('login', [AuthController::class, 'login'])
        ->middleware('guest')->name('login');

    Route::delete('logout', [AuthController::class, 'logout'])
        ->middleware('auth')->name('logout');

});