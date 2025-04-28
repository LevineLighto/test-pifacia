<?php

use App\Http\Controllers\Api\Account\PermissionController;
use App\Http\Controllers\Api\Account\RoleController;
use App\Http\Controllers\Api\Account\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')->as('accounts.')->group(function () {

    Route::prefix('users')->as('users.')->group(function() {

        Route::get('/', [UserController::class, 'get'])->name('get');
        Route::get('{id}', [UserController::class, 'find'])->name('find');
        Route::post('/', [UserController::class, 'create'])->name('create');
        Route::put('{id}', [UserController::class, 'update'])->name('update');
        Route::delete('{id}', [UserController::class, 'delete'])->name('delete');

    });

    Route::prefix('roles')->as('roles.')->group(function() {

        Route::get('/', [RoleController::class, 'get'])->name('get');
        Route::get('{id}', [RoleController::class, 'find'])->name('find');
        Route::post('/', [RoleController::class, 'create'])->name('create');
        Route::put('{id}', [RoleController::class, 'update'])->name('update');
        Route::put('{id}/permissions', [RoleController::class, 'assignPermission'])->name('assign-permission');
        Route::delete('{id}', [RoleController::class, 'delete'])->name('delete');

    });

    Route::prefix('permissions')->as('permissions.')->group(function () {

        Route::get('/', [PermissionController::class, 'get'])->name('get');

    });

});