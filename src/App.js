import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <h1><Link to="/">Lava-Dora</Link></h1>
        <ul>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
          <li>
            <Link to="/prendas">Prendas</Link>
          </li>
          <li>
            <Link to="/datos-servicio">Datos de servicio</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;