<?php

use App\Http\Controllers\AgencyOrVendorController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/',[AuthController::class,'check'])->name('check');
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
    Route::get('/user/load-users-data/{per_page_number}/{page_number}',[UserController::class,'loadUsersData'])->name('user.load_users_data');

    Route::get('/category',[CategoryController::class,'index'])->name('category.index');
    Route::post('/category/store-or-update/{category?}',[CategoryController::class,'storeOrUpdate'])->name('category.store_or_update');
    Route::get('/category/destroy/{category}',[CategoryController::class,'destroy'])->name('category.destroy');

    Route::get('/agency-or-vendor',[AgencyOrVendorController::class,'index'])->name('agency-or-vendor.index');
    Route::post('/agency-or-vendor/store-or-update/{agency_or_vendor?}',[AgencyOrVendorController::class,'storeOrUpdate'])->name('agency_or_vendor.store_or_update');
    Route::get('/agency-or-vendor/destroy/{agency_or_vendor}',[AgencyOrVendorController::class,'destroy'])->name('agency_or_vendor.destroy');

    Route::get('/expense',[ExpenseController::class,'index'])->name('expense.index');
    Route::post('/expense/store-or-update/{expense?}',[ExpenseController::class,'storeOrUpdate'])->name('expense.store_or_update');
    Route::get('/expense/destroy/{expense}',[ExpenseController::class,'destroy'])->name('expense.destroy');
    Route::get('/expense/get-categories',[ExpenseController::class,'getCategories'])->name('expense.get_categories');
    Route::get('/expense/get-sub-categories/{category}',[ExpenseController::class,'getSubCategories'])->name('expense.get_sub_categories');
    Route::get('/expense/get-vendors',[ExpenseController::class,'getVendors'])->name('expense.get_vendors');

    Route::get('/transaction',[TransactionController::class,'index'])->name('transaction.index');

    Route::get('/payment',[PaymentController::class,'index'])->name('payment.index');
    Route::post('/payment/store-or-update/{payment?}',[PaymentController::class,'storeOrUpdate'])->name('payment.store_or_update');
    Route::get('/payment/destroy/{payment}',[PaymentController::class,'destroy'])->name('payment.destroy');
    Route::get('/payment/get-vendors',[PaymentController::class,'getVendors'])->name('payment.get_vendors');

});
