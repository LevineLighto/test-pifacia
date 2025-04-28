<?php

use App\Http\Controllers\Web\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('app')->as('app.')->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

});