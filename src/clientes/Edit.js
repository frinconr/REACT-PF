import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

const collection = 'clientes';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      nombre: '',
      cedula: '',
      direccion: '',
      email: '',
      telefono1: '',
      telefono2: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const cliente = doc.data();
        this.setState({
          key: doc.id,
          nombre: cliente.nombre,
          cedula: cliente.cedula,
          direccion: cliente.direccion,
          email: cliente.email,
          telefono1: cliente.telefono1,
          telefono2: cliente.telefono2
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({cliente:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { cedula, nombre, direccion, email, telefono1, telefono2 } = this.state;

    const updateRef = firebase.firestore().collection(collection).doc(this.state.key);
    updateRef.set({
        cedula, 
        nombre, 
        direccion, 
        email, 
        telefono1, 
        telefono2
    }).then((docRef) => {
      this.setState({
        key: '',
        cedula: '',
        nombre: '',
        direccion: '',
        email: '',
        telefono1: '',
        telefono2: ''
      });
      this.props.history.push("../show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar cliente
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`../show/${this.state.key}`} class="btn btn-primary">Clientes</Link></h4>
            <form onSubmit={this.onSubmit}>
                <div class="form-group">
                    <label for="cedula">Cédula:</label>
                    <input type="text" class="form-control" name="cedula" value={this.state.cedula} onChange={this.onChange} placeholder="Cedula" />
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" class="form-control" name="nombre" value={this.state.nombre} onChange={this.onChange} placeholder="Nombre" />
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" />
                </div>
                <div class="form-group">
                    <label for="telefono1">Telefono #1:</label>
                    <input type="text" class="form-control" name="telefono1" value={this.state.telefono1} onChange={this.onChange} placeholder="Telefono #1" />
                </div>
                <div class="form-group">
                    <label for="telefono2">Telefono #2:</label>
                    <input type="text" class="form-control" name="telefono2" value={this.state.telefono2} onChange={this.onChange} placeholder="Telefono #2" />
                </div>
                <div class="form-group">
                    <label for="direccion">Dirección:</label>
                    <textArea class="form-control" name="direccion" onChange={this.onChange} placeholder="Dirección" cols="80" rows="3">{this.state.direccion}</textArea>
                </div>
              <button type="submit" class="btn btn-success">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;