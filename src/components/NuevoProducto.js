import React, { useState } from 'react';
import { crearNuevoProductoAction } from '../actions/productoActions';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions';

const NuevoProducto = () => {
  const [nombre, guardarNombre] = useState('');
  const [precio, guardarPrecio] = useState(0);
  const dispatch = useDispatch();
  const agregarProducto = (producto) => {
    dispatch(crearNuevoProductoAction(producto));
  };
  const submitNuevoProducto = (e) => {
    e.preventDefault();
    if (nombre.trim() === '' || precio === 0) {
      const alerta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center p-3 text-uppercase',
      };
      dispatch(mostrarAlerta(alerta));
    } else {
      dispatch(ocultarAlerta());
      agregarProducto({
        nombre,
        precio,
      });
    }
  };

  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  const alerta = useSelector((state) => state.alertas);
  return (
    <div className="row jutify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta ? (
              <p className={alerta?.alerta?.classes}>{alerta?.alerta?.msg}</p>
            ) : null}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="producto"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => guardarPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {cargando ? <p>Cargando...</p> : null}
            {error ? (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
