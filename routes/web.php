<?php

use App\Http\Controllers\AgencyOrVendorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/login',[AuthController::class,'login'])->name('login');
Route::post('/login-post',[AuthController::class,'loginPost'])->name('login.post');
Route::get('/logout',[AuthController::class,'logout'])->name('logout');




Route::middleware(['auth'])->group(function(){

    Route::get('/dashboard', function () {
        return Inertia::render('admin/Dashboard');
    })->name('dashboard');

    Route::get('/user',[UserController::class,'index'])->name('user.index');
    Route::post('/user/store-or-update/{user?}',[UserController::class,'storeOrUpdate'])->name('user.store_or_update');
    Route::get('/user/destroy/{user}',[UserController::class,'destroy'])->name('user.destroy');

    Route::get('/category',[CategoryController::class,'index'])->name('category.index');
    Route::post('/category/store-or-update/{category?}',[CategoryController::class,'storeOrUpdate'])->name('category.store_or_update');
    // Route::get('/user/destroy/{user}',[UserController::class,'destroy'])->name('user.destroy');

    Route::get('/agency-or-vendor',[AgencyOrVendorController::class,'index'])->name('agency-or-vendor.index');
    Route::post('/agency-or-vendor/store-or-update/{agency_or_vendor?}',[AgencyOrVendorController::class,'storeOrUpdate'])->name('agency_or_vendor.store_or_update');
    Route::get('/agency-or-vendor/destroy/{agency_or_vendor}',[AgencyOrVendorController::class,'destroy'])->name('agency_or_vendor.destroy');

});
