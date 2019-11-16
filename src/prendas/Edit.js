import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

const collection = 'prendas';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      propietario: '',
      tipo_prenda: '',
      tipo_tela: '',
      especificaciones_lavado: '',
      clientes: [],
      tipos_tela: [],
      tipos_prenda: []
    };

    this.cedulaPropietario = this.cedulaPropietario.bind(this);
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const prenda = doc.data();
        this.setState({
          key: doc.id,
          propietario: prenda.propietario.id,
          tipo_prenda: prenda.tipo_prenda.id,
          tipo_tela: prenda.tipo_tela.id,
          especificaciones_lavado: prenda.especificaciones_lavado
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

    const ref_tipos_tela = firebase.firestore().collection('tipo_tela');
    const tipos_tela = [];

    ref_tipos_tela.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { nombre } = doc.data();
        tipos_tela.push({
          key: doc.id,
          doc,
          nombre
        });
      });
      this.setState({
        tipos_tela
     });
    });


    const ref_tipos_prenda = firebase.firestore().collection('tipo_prenda');
    const tipos_prenda = [];

    ref_tipos_prenda.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { nombre } = doc.data();
        tipos_prenda.push({
          key: doc.id,
          doc,
          nombre
        });
      });
      this.setState({
        tipos_prenda
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

    const { propietario, tipo_prenda, tipo_tela, especificaciones_lavado } = this.state;
    const db = firebase.firestore();

    const updateRef = firebase.firestore().collection(collection).doc(this.state.key);
    updateRef.set({
      cedula_propietario: this.cedulaPropietario(propietario),
      propietario: db.collection('clientes').doc(propietario),
      tipo_prenda: db.collection('tipo_prenda').doc(tipo_prenda),
      tipo_tela: db.collection('tipo_tela').doc(tipo_tela), 
      especificaciones_lavado
    }).then((docRef) => {
      this.setState({
        key: '',
        propietario: '',
        tipo_prenda: '',
        tipo_tela: '',
        especificaciones_lavado: ''
      });
      this.props.history.push("../show/"+this.props.match.params.id)
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
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar prenda
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`../show/${this.state.key}`} class="btn btn-primary">Prendas</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label htmlFor="propietario">Propietario:</label>
                <select class="form-control" name="propietario" onChange={this.onChange} placeholder="Propietario" cols="80" rows="3" value={this.state.propietario}>
                  {this.state.clientes.map(c => {
                    return <option value={c.key}>{c.nombre} ({c.cedula})</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label htmlFor="tipo_prenda">Tipo de prenda:</label>
                <select class="form-control" name="tipo_prenda" onChange={this.onChange} placeholder="Tipo de prenda" cols="80" rows="3" value={this.state.tipo_prenda}>
                  {this.state.tipos_prenda.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label htmlFor="tipo_tela">Tipo de tela:</label>
                <select class="form-control" name="tipo_tela" onChange={this.onChange} placeholder="Tipo de tela" cols="80" rows="3" value={this.state.tipo_tela}>
                  {this.state.tipos_tela.map(x => {
                    return <option value={x.key}>{x.nombre}</option>;
                  })}
                </select>
              </div>
              <div class="form-group">
                <label htmlFor="especificaciones_lavado">Especificaciones de lavado:</label>
                <textArea class="form-control" name="especificaciones_lavado" onChange={this.onChange} placeholder="Especificaciones de lavado" cols="80" rows="3">{this.state.especificaciones_lavado}</textArea>
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