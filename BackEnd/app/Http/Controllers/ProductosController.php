<?php

namespace App\Http\Controllers;

use App\Productos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;
use Carbon\Carbon;

class ProductosController extends Controller
{
    public function index()
    {
        try {
            $productos = Productos::all();
            return $productos;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'nombre' => 'required',
            'referencia' => 'required',
            'precio' => 'required|numeric',
            'peso' => 'required|numeric',
            'categoria' => 'required',
            'stock' => 'required|numeric',
            'fechaCreacion' => 'required',
            'fechaVenta',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'ok' => false,
                'error' => $validator->messages(),
            ]);
        }
        try {
            Productos::create($input);
        } catch (\exception $ex) {
            return $ex->getMessage();
        }
    }

    public function update($id, Request $request)
    {
        try {
            $input = $request->all();
            $producto = Validator::make($input, [
                'nombre' => 'required',
                'referencia' => 'required',
                'precio' => 'required|numeric',
                'peso' => 'required|numeric',
                'categoria' => 'required',
                'stock' => 'required|numeric',
                'fechaCreacion' => 'required',
                'fechaVenta',
            ]);
            if ($producto->fails()) {
                return response()->json([
                    'ok' => false,
                    'error' => $producto->messages(),
                ]);
            }
            $producto = Productos::find($id);
            if ($producto == false) {
                return "Los sentimos no se pudo encontrar el datos que estaba buscando, por favor inténtelo nuevamente.";
            }
            $producto->update($input);
            return  "Se modificado el producto";
        } catch (\exception $ex) {
            return response()->json([
                "error" => $ex->getMessage(),
            ]);
        }
    }
    public function destroy($id)
    {
        try {
            $producto = Productos::find($id);
            if ($producto == false) {
                return "Los sentimos no se pudo encontrar los datos que estaba buscando, por favor inténtelo nuevamente.";
            }
            DB::table('productos')->where("id", $id)->delete();
            return "Se ha eliminado el producto";
        } catch (\exception $ex) {
            return $ex->getMessage();
        }
    }
    public function venderProducto($id)
    {
        try {
            $producto = Productos::find($id);
            if ($producto == false) {
                return "Los sentimos no se pudo encontrar los datos que estaba buscando, por favor inténtelo nuevamente.";
            }
            $producto = Productos::select("stock")->where("id", $id)->first();
            if ($producto->stock <= 0) {
                return "Lo sentimos, no hay suficiente unidades en stock del producto.";
            }
            $date = Carbon::now();
            $producto = DB::table('productos')
                ->where('id', $id)
                ->update(['stock' => $producto->stock - 1, 'fechaVenta' => $date]);
            return "Se ha vendido una unidad del  producto";
        } catch (\exception $ex) {
            return $ex->getMessage();
        }
    }
}
