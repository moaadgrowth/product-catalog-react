<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home')->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');

Route::prefix('admin')->name('admin.')->group(function (): void {
    Route::inertia('/', 'Admin/Dashboard')->name('dashboard');

    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('products', AdminProductController::class)->except(['show']);
});
