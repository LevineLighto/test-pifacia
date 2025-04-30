<?php

use App\Http\Controllers\Web\Account\RoleController;
use App\Http\Controllers\Web\Account\UserController;
use App\Http\Controllers\Web\Dashboard\DashboardController;
use App\Http\Controllers\Web\Hr\DivisionController;
use App\Http\Controllers\Web\Hr\EmployeeController;
use App\Http\Controllers\Web\Hr\PositionController;
use App\Http\Controllers\Web\Misc\ActivityController;
use Illuminate\Support\Facades\Route;

Route::prefix('app')->as('app.')->group(function () {

    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('roles', [RoleController::class, 'index'])->name('roles.index');

    Route::get('employees', [EmployeeController::class, 'index'])->name('employees.index');
    Route::get('divisions', [DivisionController::class, 'index'])->name('divisions.index');
    Route::get('positions', [PositionController::class, 'index'])->name('positions.index');

    Route::get('activities', [ActivityController::class, 'index'])->name('activities.index');

});