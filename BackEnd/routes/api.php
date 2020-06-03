<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get("listar", "ProductosController@index");
Route::post("create", "ProductosController@store");
Route::put("update/{id}", "ProductosController@update");
Route::delete("delete/{id}", "ProductosController@destroy");
Route::put("vender/{id}", "ProductosController@venderProducto");
