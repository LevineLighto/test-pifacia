<?php

use App\Http\Controllers\Api\Misc\ActivityController;
use Illuminate\Support\Facades\Route;

Route::prefix('misc')->as('misc.')->middleware('auth')->group(function () {

    Route::prefix('activities')->as('activities.')->group(function () {

        Route::get('/', [ActivityController::class, 'get'])->name('get');

    });

});