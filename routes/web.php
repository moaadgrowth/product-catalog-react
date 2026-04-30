<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Admin\CategoryController;

Route::inertia('/', 'welcome')->name('home');

Route::get('/products', [ProductController::class, 'index'])->name('products');

Route::prefix('admin')->name('admin.')->group(function () {
    Route::resource('categories', CategoryController::class);
});