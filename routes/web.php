<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});
Route::get('/index', function () {
    return view('index');
});
Route::get('/page-about', function () {
    return view('page-about');
});
Route::get('/page-policy', function () {
    return view('page-policy');
});
Route::get('/transaction', function () {
    return view('trade/transaction');
});
Route::get('/store', function () {
    return view('store');
});
Route::get('/login', function () {
    return view('login');
});
Route::get('/register', function () {
    return view('register');
});
Route::get('/transfer', function () {
    return view('transfer');
});
Route::get('/bank', function () {
    return view('bank');
});
Route::get('/member', function () {
    return view('member');
});
Route::get('/record_store', function () {
    return view('record_store');
});
Route::get('/record_transfer', function () {
    return view('record_transfer');
});
Route::get('/record_withdraw', function () {
    return view('record_withdraw');
});
Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
use App\Http\Controllers\StockController;

Route::post('/update-stock', [StockController::class, 'updatePrice']);
