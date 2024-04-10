<?php

use App\Http\Controllers\AgencyOrVendorController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('admin/Dashboard');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/registration', function () {
    return Inertia::render('Registration');
});

Route::get('/user',[UserController::class,'index'])->name('user.index');
Route::get('/user/create',[UserController::class,'create'])->name('user.create');
Route::post('/user/store-or-update',[UserController::class,'storeOrUpdate'])->name('user.store_or_update');

Route::get('/category',[CategoryController::class,'index'])->name('category.index');
Route::get('/category/create',[CategoryController::class,'create'])->name('category.create');
Route::get('/category/store-or-update',[CategoryController::class,'storeOrUpdate'])->name('category.store_or_update');

Route::get('/agency-or-vendor',[AgencyOrVendorController::class,'index'])->name('agency-or-vendor.index');
Route::post('/agency-or-vendor/store-or-update/{agency_or_vendor?}',[AgencyOrVendorController::class,'storeOrUpdate'])->name('agency_or_vendor.store_or_update');
Route::get('/agency-or-vendor/destroy/{agency_or_vendor?}',[AgencyOrVendorController::class,'destroy'])->name('agency_or_vendor.destroy');
