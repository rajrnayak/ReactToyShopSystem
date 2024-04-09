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

Route::get('/admin/user',[UserController::class,'index'])->name('user.index');
Route::get('/admin/user/create',[UserController::class,'create'])->name('user.create');
Route::post('/admin/user/store-or-update',[UserController::class,'storeOrUpdate'])->name('user.store_or_update');

Route::get('/admin/category',[CategoryController::class,'index'])->name('category.index');
Route::get('/admin/category/create',[CategoryController::class,'create'])->name('category.create');
Route::get('/admin/category/store-or-update',[CategoryController::class,'storeOrUpdate'])->name('category.store_or_update');

Route::get('/admin/agencyOrVendor',[AgencyOrVendorController::class,'index'])->name('agency-or-vendor.index');
Route::get('/admin/agencyOrVendor/form',[AgencyOrVendorController::class,'form'])->name('agency-or-vendor.form');
Route::post('/admin/agencyOrVendor/store-or-update',[AgencyOrVendorController::class,'storeOrUpdate'])->name('agency-or-vendor.store_or_update');
