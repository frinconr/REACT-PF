import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from './Firebase';

const collection = 'prendas';

class PrendasAdmin extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection(collection);
    this.unsubscribe = null;
    this.state = {
      prendas: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const prendas = [];
    querySnapshot.forEach((doc) => {
      const { cedula_propietario, especificaciones_lavado } = doc.data();

        prendas.push({
            key: doc.id,
            doc,
            cedula_propietario,
            especificaciones_lavado, 
          });
    });

    this.setState({
      prendas
   });

  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Prendas
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/prendas/create">Agregar prenda</Link></h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Propietario</th>
                  <th>Especificaciones de lavado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {this.state.prendas.map(prenda =>
                  <tr key={prenda.key}>
                    <td>{prenda.key}</td>
                    <td>{prenda.cedula_propietario}</td>
                    <td>{prenda.especificaciones_lavado}</td>
                    <td>
                        <Link to={`/prendas/show/${prenda.key}`}>Ver</Link>/
                        <Link to={`/prendas/edit/${prenda.key}`}>Editar</Link>
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

export default PrendasAdmin;