<?php

use App\Http\Controllers\Api\Hr\DivisionController;
use App\Http\Controllers\Api\Hr\EmployeeController;
use App\Http\Controllers\Api\Hr\PositionController;
use Illuminate\Support\Facades\Route;

Route::prefix('hr')->as('hr.')->middleware('auth')->group(function () {

    Route::prefix('divisions')->as('divisions.')->group(function () {

        Route::get('/', [DivisionController::class, 'get'])->name('get');
        Route::post('export', [DivisionController::class, 'export'])->name('export');
        Route::post('import', [DivisionController::class, 'import'])->name('import');
        Route::post('import/upload', [DivisionController::class, 'uploadImport'])->name('import.upload');
        Route::get('{id}', [DivisionController::class, 'find'])->name('find');
        Route::post('/', [DivisionController::class, 'create'])->name('create');
        Route::put('{id}', [DivisionController::class, 'update'])->name('update');
        Route::delete('{id}', [DivisionController::class, 'delete'])->name('delete');

    });

    Route::prefix('positions')->as('positions.')->group(function () {

        Route::get('/', [PositionController::class, 'get'])->name('get');
        Route::post('export', [PositionController::class, 'export'])->name('export');
        Route::post('import', [PositionController::class, 'import'])->name('import');
        Route::post('import/upload', [PositionController::class, 'uploadImport'])->name('import.upload');
        Route::get('{id}', [PositionController::class, 'find'])->name('find');
        Route::post('/', [PositionController::class, 'create'])->name('create');
        Route::put('{id}', [PositionController::class, 'update'])->name('update');
        Route::delete('{id}', [PositionController::class, 'delete'])->name('delete');

    });

    Route::prefix('employees')->as('employees.')->group(function () {

        Route::get('/', [EmployeeController::class, 'get'])->name('get');
        Route::post('export', [EmployeeController::class, 'export'])->name('export');
        Route::post('import', [EmployeeController::class, 'import'])->name('import');
        Route::post('import/upload', [EmployeeController::class, 'uploadImport'])->name('import.upload');
        Route::get('{id}', [EmployeeController::class, 'find'])->name('find');
        Route::get('{id}/bpjs', [EmployeeController::class, 'bpjs'])->name('bpjs');
        Route::post('/', [EmployeeController::class, 'create'])->name('create');
        Route::put('{id}', [EmployeeController::class, 'update'])->name('update');
        Route::delete('{id}', [EmployeeController::class, 'delete'])->name('delete');

    });

});