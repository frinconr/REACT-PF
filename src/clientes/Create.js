import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('clientes');
    this.state = {
      nombre: '',
      cedula: '',
      direccion: '',
      email: '',
      telefono1: '',
      telefono2: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { cedula, nombre, direccion, email, telefono1, telefono2 } = this.state;

    this.ref.add({
        cedula, 
        nombre, 
        direccion, 
        email, 
        telefono1, 
        telefono2
    }).then((docRef) => {
      this.setState({
        cedula: '',
        nombre: '',
        direccion: '',
        email: '',
        telefono1: '',
        telefono2: ''
      });
      this.props.history.push("/clientes")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { cedula, nombre, direccion, email, telefono1, telefono2 } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Agregar cliente
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="../" class="btn btn-primary">Clientes</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="cedula">Cédula:</label>
                <input type="text" class="form-control" name="cedula" value={cedula} onChange={this.onChange} placeholder="Cedula" />
              </div>
              <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" class="form-control" name="nombre" value={nombre} onChange={this.onChange} placeholder="Nombre" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="telefono1">Telefono #1:</label>
                <input type="text" class="form-control" name="telefono1" value={telefono1} onChange={this.onChange} placeholder="Telefono #1" />
              </div>
              <div class="form-group">
                <label for="telefono2">Telefono #2:</label>
                <input type="text" class="form-control" name="telefono2" value={telefono2} onChange={this.onChange} placeholder="Telefono #2" />
              </div>
              <div class="form-group">
                <label for="direccion">Dirección:</label>
                <textArea class="form-control" name="direccion" onChange={this.onChange} placeholder="Dirección" cols="80" rows="3">{direccion}</textArea>
              </div>
              <button type="submit" class="btn btn-success">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;