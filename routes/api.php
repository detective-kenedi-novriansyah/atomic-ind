<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PurseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([

    'middleware' => 'api',
    'prefix' => 'v1/auth'

], function ($router) {
    Route::post('create', [AuthController::class, 'create']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::resource('v1/purse', PurseController::class);


Route::get('v1/purse', [PurseController::class, 'index']);

Route::post('v1/purse', [PurseController::class, 'store']);
Route::post('v1/purse/active/{purse}', [PurseController::class, 'active'])->name('active');
// // Route::put('v1/purse/{purse}', [PurseController::class, 'update'])->name('update');
// // Route::delete('v1/purse/{purse}', [PurseController::class, 'destroy'])->name('destroy');
// // Route::get('v1/purse/{purse}', [PurseController::class, 'show'])->name('detail');