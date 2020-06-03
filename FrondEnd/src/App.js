import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Card, Col, CardBody } from "reactstrap";
import Tabla from "./components/Tabla";
import URL from "./config/URL";
import 'bootstrap/dist/css/bootstrap.min.css';

const productosSchema = Yup.object().shape({

  nombre: Yup.string().required("Required"),
  referencia: Yup.string().required("Required"),
  precio: Yup.number().required("Required"),
  peso: Yup.number().required("Required"),
  categoria: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
  fechaCreacion: Yup.date().required("Required"),
  fechaUltimaVenta: Yup.date(),
});
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      parametro: ""
    };
  }
  producto = {
    id: 0,
    nombre: "",
    referencia: "",
    precio: 0,
    peso: 0,
    categoria: "",
    stock: 0,
    fechaCreacion: "",
    fechaVenta: ""
  };

  guardar(value) {
    axios({
      method: "post",
      url: `${URL}/create`,
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      this.llamar_listar();
      document.getElementById("registro").reset();
    });
  }
  actualizar(id, value) {
    axios({
      method: "put",
      url: `${URL}/update/${id}`,
      data: value
    }).then(respuesta => {
      let datos = respuesta.data;
      this.llamar_listar();
      document.getElementById("registro").reset();
    });
  }

  llamar_listar() {
    axios({
      method: "get",
      url: `${URL}/listar`,
    }).then(respuesta => {
      let productos = [];

      respuesta.data.forEach(d => {
        const {
          id,
          nombre,
          precio,
          referencia,
          peso,
          categoria,
          stock,
          fechaCreacion,
          fechaVenta,
        } = d;
        let obj = {
          id,
          nombre,
          precio,
          referencia,
          peso,
          categoria,
          stock,
          fechaCreacion,
          fechaVenta,
          acciones: [
            <button
              onClick={() => this.editar(id, nombre, precio, referencia, peso, categoria, stock, fechaCreacion, fechaVenta)}
              className="btn btn-info" > Editar
            </button >,
            <button onClick={() => this.eliminar(id)} className="btn btn-primary"> Eliminar </button>,
            <button onClick={() => this.vender(id)} className="btn btn-primary"> Vender </button>
          ]
        };
        productos.push(obj);
      });
      this.setState({
        productos
      });
    });
  }
  componentDidMount() {
    this.llamar_listar();
  }

  editar(id, nombre, precio, referencia, peso, categoria, stock, fechaCreacion, fechaVenta) {
    //  this.producto.push(id,nombre,precio,referencia,peso,categorias,stock,fechaCreacion,fechaVenta);
    this.producto.id = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.referencia = referencia;
    this.producto.categoria = categoria;
    this.producto.stock = stock;
    this.producto.fechaCreacion = fechaCreacion;
    this.producto.fechaVenta = fechaVenta;
    this.producto.peso = peso;
    this.llamar_listar();
  }

  eliminar(id) {
    axios({
      method: "delete",
      url: `${URL}/delete/${id}`,
    })
      .then(respuesta => {
        let r = respuesta;
        this.llamar_listar();
        alert(respuesta.data);
      })
      .catch(error => {
        alert("Error");
      });
  }
  vender(id) {
    axios({
      method: "put",
      url: `${URL}/vender/${id}`,
    })
      .then(respuesta => {
        let r = respuesta;
        this.llamar_listar();
        alert(respuesta.data);
      })
      .catch(error => {
        alert("Error");
      });
  }

  render() {
    var data = this.state.productos;
    var ds = [];
    if (this.state.parametro !== "") {
      data.forEach(v => {
        if (v.productos.toLowerCase().includes(this.state.parametro)) {
          ds.push(v);
        }
      });
      data = ds;
    }
    return (
      <div>
        <Formik
          initialValues={this.producto}
          validationSchema={productosSchema}
          onSubmit={value => {
            value.id != 0 ? this.actualizar(value.id, value) : this.guardar(value);
          }}
        >
          {({ errors, touched, values }) => (
            <Form id="registro">
              <div align="center">
                <h3>Productos</h3>
              </div>
              <div className="content">
                <Card className="flex-row">
                  <CardBody>
                    <div className="container">
                      <div className="row">
                        <div align="center" className="col-6 form-group">
                          <label>Nombre producto(*)</label>
                          <Field name="nombre" className="form-control" />
                          {errors.nombre && touched.nombre ? (<div className="text-danger"> {errors.nombre} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Referrencia(*)</label>
                          <Field name="referencia" className="form-control" />
                          {errors.referencia && touched.referencia ? (<div className="text-danger"> {errors.referencia} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Precio(*)</label>
                          <Field name="precio" className="form-control" />
                          {errors.precio && touched.precio ? (<div className="text-danger"> {errors.precio} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Peso(*)</label>
                          <Field name="peso" className="form-control" />
                          {errors.peso && touched.peso ? (<div className="text-danger"> {errors.peso} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Categoría(*)</label>
                          <Field name="categoria" className="form-control" />
                          {errors.categoria && touched.categoria ? (<div className="text-danger"> {errors.categoria} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Stock(*)</label>
                          <Field name="stock" className="form-control" />
                          {errors.stock && touched.stock ? (<div className="text-danger"> {errors.stock} </div>) : null}
                        </div>
                        <div align="center" className="col-6 form-group">
                          <label>Fecha creación(*)</label>
                          <Field name="fechaCreacion" type="date" className="form-control" />
                          {errors.fechaCreacion && touched.fechaCreacion ? (<div className="text-danger"> {errors.fechaCreacion} </div>) : null}
                        </div>
                        <div align="center" className="col-12 form-group">
                          <button type="submit" className="btn btn-success float-center">
                            Guardar
                        </button>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Form>
          )}
        </Formik>
        <br />
        <Formik
          initialValues={this.producto}
          onSubmit={value => {
            this.vender(value.id);
          }}
        >

          {({ errors, touched, values }) => (
            <Form id="vender">
              <div className="container">
                <div align="center" className="col-6 form-group">
                  <label>Ingrese id del producto</label>
                  <Field name="id" className="form-control" />
                </div>

                <div align="center" className="col-12 form-group">
                  <button type="submit" className="btn btn-success float-center">
                    vender
                        </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <Card className="flex-row">
          <CardBody>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Tabla
                    datos={data}
                    botones
                    titulos={["Id", "Nombre", "Referencia", "Precio", "Peso", "Categoria", "Stock", "Fecha Creación", "Fecha ultima venta"]}
                    propiedades={["id", "nombre", "referencia", "precio", "peso", "categoria", "stock", "fechaCreacion", "fechaVenta", "acciones"]}
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default App;