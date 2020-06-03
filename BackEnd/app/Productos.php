<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Productos extends Model
{
    protected $table="productos";
    protected $fillable = ["nombre","precio","referencia","peso","categoria","stock","fechaCreacion","fechaVenta"];
    protected $primarykey = "id";
    public $timestamps = false;
}
