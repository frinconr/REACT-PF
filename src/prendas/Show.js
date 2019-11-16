import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

const collection = 'prendas';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      prenda: {},
      tipo_prenda:{},
      tipo_tela:{},
      propietario:{},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection(collection).doc(this.props.match.params.id);

    ref.get().then((doc) => {
      var data = doc.data();
      if (doc.exists) {
        this.setState({
          prenda: data,
          key: doc.id,
          isLoading: false
        })

        if(data.propietario){
          data.propietario.get().then((doc) => {
            if(doc.exists){
              this.setState({
                propietario: doc.data() ,
              });
            }
          });
        }

        if(data.tipo_prenda){
          data.tipo_prenda.get().then((doc) => {
            if(doc.exists){
              this.setState({
                tipo_prenda: doc.data() ,
              });
            }
          });
        }

        if(data.tipo_tela){
          data.tipo_tela.get().then((doc) => {
            if(doc.exists){
              this.setState({
                tipo_tela: doc.data() ,
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
          <h4><Link to="../">Prendas</Link></h4>
            <h3 class="panel-title">
              {this.state.prenda.key}
            </h3>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Propietario:</dt>
              <dd>{this.state.propietario.cedula} - {this.state.propietario.nombre} </dd>
              <dt>Tipo de prenda:</dt>
              <dd>{this.state.tipo_prenda.nombre}</dd>
              <dt>Tipo de tela:</dt>
              <dd>{this.state.tipo_tela.nombre}</dd>
              <dt>Especificaciones de lavado:</dt>
              <dd>{this.state.prenda.especificaciones_lavado}</dd>
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