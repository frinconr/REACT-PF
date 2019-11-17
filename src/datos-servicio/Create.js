import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('datos_servicio');
    this.state = {
      propietario: '', 
      comentarios: '', 
      estado: '', 
      fecha_devolucion: '', 
      fecha_recibido: '', 
      indicaciones: '', 
      prenda: '',
      clientes: [],
      prendas: [],
      prendas_usuario: [],
      estados: []
    };
    this.cedulaPropietario = this.cedulaPropietario.bind(this);
  }

  componentDidMount() {
    const ref_clientes = firebase.firestore().collection('clientes');
    const clientes = [];

    ref_clientes.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { cedula, nombre } = doc.data();
        clientes.push({
          key: doc.id,
          doc,
          cedula,
          nombre
        });
      });
      this.setState({
        clientes
     });
    });

    const ref_prendas = firebase.firestore().collection('prendas');
    const prendas = [];

    ref_prendas.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { cedula_propietario, nombre } = doc.data();
        prendas.push({
          key: doc.id,
          doc,
          cedula_propietario,
          nombre
        });
      });
      this.setState({
        prendas
     });
    });

    const ref_estados = firebase.firestore().collection('estado_servicio');
    const estados = [];

    ref_estados.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { nombre } = doc.data();
        estados.push({
          key: doc.id,
          doc,
          nombre
        });
      });
      this.setState({
        estados
     });
    });
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);

    if(e.target.name === 'propietario'){
      var prendas_usuario = state.prendas.filter(
        p => p.cedula_propietario === this.cedulaPropietario(state.propietario));
      
      this.setState({
        prendas_usuario
      })  
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { propietario, comentarios, estado, fecha_devolucion, fecha_recibido, indicaciones, prenda } = this.state;
    const db = firebase.firestore();

    this.ref.add({
      cedula_propietario: this.cedulaPropietario(propietario),
      prenda: db.collection('prendas').doc(prenda),
      estado: db.collection('estado_servicio').doc(estado),
      fecha_recibido: new Date(fecha_recibido),
      fecha_devolucion: new Date(fecha_devolucion),
      comentarios,
      indicaciones
    }).then((docRef) => {
      this.setState({
        propietario: '', 
        comentarios: '', 
        estado: '', 
        fecha_devolucion: '', 
        fecha_recibido: '', 
        indicaciones: '', 
        prenda: ''
      });
      this.props.history.push("/datos-servicio")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  cedulaPropietario(key){
    var cliente = this.state.clientes.find(c => c.key === key);
    var cedula = '';

    if(cliente){
      cedula = cliente.cedula;
    }

    return cedula;
  }

  render() {
    const { comentarios, fecha_devolucion, fecha_recibido, indicaciones } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Agregar datos de servicio
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="../" class="btn btn-primary">Datos de servicio</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="propietario">Propietario:</label>
                <select required class="form-control" name="propietario" onChange={this.onChange} placeholder="Propietario" cols="80" rows="3">
                <option value="">Seleccione un cliente</option>
                  {this.state.clientes.map(c => {
                    return <option value={c.key}>{c.nombre} ({c.cedula})</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="prenda">Prendas del usuario:</label>
                <select required class="form-control" name="prenda" onChange={this.onChange} placeholder="Prendas del usuario" cols="80" rows="3">
                  <option value="">Seleccione una prenda</option>
                  {this.state.prendas_usuario.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="estado">Estado del servicio:</label>
                <select required class="form-control" name="estado" onChange={this.onChange} placeholder="Estado del servicio" cols="80" rows="3">
                  <option value="">Seleccione un estado</option>
                  {this.state.estados.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="fecha_recibido">Fecha de recibido:</label>
                <input type="date" class="form-control" name="fecha_recibido" value={fecha_recibido} onChange={this.onChange} placeholder="Fecha de recibido" />
              </div>
              <div class="form-group">
                <label for="fecha_devolucion">Fecha de devolución:</label>
                <input type="date" class="form-control" name="fecha_devolucion" value={fecha_devolucion} onChange={this.onChange} placeholder="Fecha de devolución" />
              </div>
              <div class="form-group">
                <label for="comentarios">Comentarios:</label>
                <textArea class="form-control" name="comentarios" onChange={this.onChange} placeholder="Comentarios" cols="80" rows="3">{comentarios}</textArea>
              </div>
              <div class="form-group">
                <label for="indicaciones">Especificaciones de lavado:</label>
                <textArea class="form-control" name="indicaciones" onChange={this.onChange} placeholder="Indicaciones de lavado" cols="80" rows="3">{indicaciones}</textArea>
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