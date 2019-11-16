import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

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

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      datos_servicio:{},
      prenda: {},
      propietario:{},
      estado: {}
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);

    ref.get().then((doc) => {
      var data = doc.data();
      if (doc.exists) {
        this.setState({
          datos_servicio: data,
          key: doc.id,
          isLoading: false
        })

        if(data.cedula_propietario){
          var ref_propietario = firebase.firestore().collection('clientes').where("cedula", "==", data.cedula_propietario);
          ref_propietario.get().then((query) => {
            var docs = query.docs;
            if(docs){
              this.setState({
                propietario: docs[0].data()
              });
            }
          });
        }

        if(data.estado){
          data.estado.get().then((doc) => {
            if(doc.exists){
              this.setState({
                estado: doc.data() ,
              });
            }
          });
        }

        if(data.prenda){
          data.prenda.get().then((doc) => {
            if(doc.exists){
              this.setState({
                prenda: doc.data() ,
              });
            }
          });
        }

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
          <h4><Link to="../">Datos de servicio</Link></h4>
            <h3 class="panel-title">
              {this.state.prenda.key}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Propietario:</dt>
              <dd>{this.state.propietario.cedula} - {this.state.propietario.nombre} </dd>
              <dt>Prenda:</dt>
              <dd>{this.state.prenda.nombre}</dd>
              <dt>Estado:</dt>
              <dd>{this.state.estado.nombre}</dd>
              <dt>Fecha de recibido:</dt>
              <dd>{formatDate(this.state.datos_servicio.fecha_recibido)}</dd>
              <dt>Fecha de devolución:</dt>
              <dd>{formatDate(this.state.datos_servicio.fecha_devolucion)}</dd>
              <dt>Comentarios:</dt>
              <dd>{this.state.datos_servicio.comentarios}</dd>
              <dt>Indicaciones de lavado:</dt>
              <dd>{this.state.datos_servicio.indicaciones}</dd>
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