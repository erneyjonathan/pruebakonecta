<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductosTable extends Migration
{

    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre');
            $table->string('referencia');
            $table->integer('precio');
            $table->integer('peso');
            $table->string('categoria');
            $table->integer('stock');
            $table->dateTime('fechaVenta')->nullable();
            $table->date('fechaCreacion');
        });
    }


    public function down()
    {
        Schema::dropIfExists('productos');
    }
}
