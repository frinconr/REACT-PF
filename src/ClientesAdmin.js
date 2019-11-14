import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

const collection = 'clientes';

class ClientesAdmin extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection(collection);
    this.unsubscribe = null;
    this.state = {
      clientes: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const clientes = [];
    querySnapshot.forEach((doc) => {
      const { cedula, nombre, direccion, email, telefono1, telefono2 } = doc.data();
      clientes.push({
        key: doc.id,
        doc,
        cedula, 
        nombre, 
        direccion, 
        email, 
        telefono1, 
        telefono2
      });
    });
    this.setState({
      clientes
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
              Clientes
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/clientes/create">Agregar cliente</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Cedula</th>
                  <th>Email</th>
                  <th>Dirección</th>
                  <th>Telefono #1</th>
                  <th>Telefono #2</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.clientes.map(cliente =>
                  <tr>
                    <td>{cliente.nombre}</td>
                    <td>{cliente.cedula}</td>
                    <td>{cliente.email}</td>
                    <td>{cliente.direccion}</td>
                    <td>{cliente.telefono1}</td>
                    <td>{cliente.telefono2}</td>
                    <td>
                        <Link to={`/clientes/show/${cliente.key}`}>Ver</Link>
                        <Link to={`/clientes/edit/${cliente.key}`}>Editar</Link>
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

export default ClientesAdmin;