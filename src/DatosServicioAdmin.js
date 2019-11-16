import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

const collection = 'datos_servicio';

function formatDate(timestamp) {

    if(!timestamp) return '';

    var date = timestamp.toDate();

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

class DatosServicioAdmin extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection(collection);
    this.unsubscribe = null;
    this.state = {
      datos_servicio: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const datos_servicio = [];
    querySnapshot.forEach((doc) => {
      const { cedula_propietario, comentarios, estado, fecha_devolucion, fecha_recibido, indicaciones, prenda } = doc.data();
      datos_servicio.push({
        key: doc.id,
        doc,
        cedula_propietario, 
        comentarios, 
        estado, 
        fecha_devolucion, 
        fecha_recibido, 
        indicaciones, 
        prenda
      });
    });
    this.setState({
        datos_servicio
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Datos servicio
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/datos-servicio/create">Agregar datos de servicio</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Cedula propietario</th>
                  <th>Fecha de recibido</th>
                  <th>Fecha de devolución</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.datos_servicio.map(datos =>
                  <tr>
                    <td>{datos.key}</td>
                    <td>{datos.cedula_propietario}</td>
                    <td>{formatDate(datos.fecha_recibido)}</td>
                    <td>{formatDate(datos.fecha_devolucion)}</td>
                    <td>
                        <Link to={`/datos-servicio/show/${datos.key}`}>Ver</Link>/
                        <Link to={`/datos-servicio/edit/${datos.key}`}>Editar</Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DatosServicioAdmin;