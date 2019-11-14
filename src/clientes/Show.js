import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

const collection = 'clientes';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cliente: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          cliente: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection(collection).doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("../")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="../">Clientes</Link></h4>
            <h3 class="panel-title">
              {this.state.cliente.nombre}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Cedula:</dt>
              <dd>{this.state.cliente.cedula}</dd>
              <dt>Email:</dt>
              <dd>{this.state.cliente.email}</dd>
              <dt>Dirección:</dt>
              <dd>{this.state.cliente.direccion}</dd>
              <dt>Telefono #1:</dt>
              <dd>{this.state.cliente.telefono1}</dd>
              <dt>Telefono #2:</dt>
              <dd>{this.state.cliente.telefono2}</dd>
            </dl>
            <Link to={`../edit/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Borrar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;