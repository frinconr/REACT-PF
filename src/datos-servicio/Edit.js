import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

const collection = 'datos_servicio';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
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

    this.toDate = this.toDate.bind(this);
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const datos = doc.data();
        this.setState({
          key: doc.id,
          cedula_propietario: datos.cedula_propietario, 
          comentarios: datos.comentarios, 
          estado: datos.estado.id, 
          fecha_devolucion: this.toDate(datos.fecha_devolucion), 
          fecha_recibido: this.toDate(datos.fecha_recibido), 
          indicaciones: datos.indicaciones, 
          prenda: datos.prenda.id,
        });
      } else {
        console.log("No such document!");
      }
    });

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
    this.setState({cliente:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { cedula_propietario, comentarios, estado, fecha_devolucion, fecha_recibido, indicaciones, prenda } = this.state;
    const db = firebase.firestore();

    const updateRef = firebase.firestore().collection(collection).doc(this.state.key);
    updateRef.set({
      cedula_propietario,
      prenda: db.collection('prendas').doc(prenda),
      estado: db.collection('estado_servicio').doc(estado),
      fecha_recibido: new Date(fecha_recibido),
      fecha_devolucion: new Date(fecha_devolucion),
      comentarios,
      indicaciones
    }).then((docRef) => {
      this.setState({
        key: '',
        propietario: '', 
        comentarios: '', 
        estado: '', 
        fecha_devolucion: '', 
        fecha_recibido: '', 
        indicaciones: '', 
        prenda: ''
      });
      this.props.history.push("../show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  toDate(timestamp){
    if(!timestamp) return;

    var date =  timestamp.toDate();

    // var day = date.getDate();
    // var month = date.getMonth();
    // var year = date.getFullYear();

    // var d = new Date(date),
     var month = '' + (date.getMonth() + 1);
     var day = '' + date.getDate();
     var year = date.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  
    // return year+ '-' + month + '-' + day;
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar datos de servicio
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`../show/${this.state.key}`} class="btn btn-primary">Datos de servicio</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="propietario">Propietario:</label>
                <select class="form-control" name="propietario" onChange={this.onChange} placeholder="Propietario" value={this.state.cedula_propietario} disabled cols="80" rows="3">
                  {this.state.clientes.map(c => {
                    return <option value={c.cedula}>{c.nombre} ({c.cedula})</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="prenda">Prendas del usuario:</label>
                <select class="form-control" name="prenda" onChange={this.onChange} value={this.state.prenda} disabled placeholder="Prendas del usuario" cols="80" rows="3">
                  {this.state.prendas.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="estado">Estado del servicio:</label>
                <select class="form-control" name="estado" onChange={this.onChange} placeholder="Estado del servicio" value={this.state.estado} cols="80" rows="3">
                  {this.state.estados.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label for="fecha_recibido">Fecha de recibido:</label>
                <input type="date" class="form-control" name="fecha_recibido" value={this.state.fecha_recibido} onChange={this.onChange} placeholder="Fecha de recibido" />
              </div>
              <div class="form-group">
                <label for="fecha_devolucion">Fecha de devolución:</label>
                <input type="date" class="form-control" name="fecha_devolucion" value={this.state.fecha_devolucion} onChange={this.onChange} placeholder="Fecha de devolución" />
              </div>
              <div class="form-group">
                <label for="comentarios">Comentarios:</label>
                <textArea class="form-control" name="comentarios" onChange={this.onChange} placeholder="Comentarios" cols="80" rows="3">{this.state.comentarios}</textArea>
              </div>
              <div class="form-group">
                <label for="indicaciones">Especificaciones de lavado:</label>
                <textArea class="form-control" name="indicaciones" onChange={this.onChange} placeholder="Indicaciones de lavado" cols="80" rows="3">{this.state.indicaciones}</textArea>
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