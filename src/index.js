import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ClienteEdit from './clientes/Edit';
import ClienteCreate from './clientes/Create';
import ClienteShow from './clientes/Show';
import ClientesAdmin from './ClientesAdmin';

import PrendaEdit from './prendas/Edit'
import PrendaCreate from './prendas/Create';
import PrendaShow from './prendas/Show';
import PrendasAdmin from './PrendasAdmin';

import DatosEdit from './datos-servicio/Edit';
import DatosCreate from './datos-servicio/Create';
import DatosShow from './datos-servicio/Show'
import DatosServicioAdmin from './DatosServicioAdmin';

ReactDOM.render(
  <Router>
      <div>
          <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/clientes' component={ClientesAdmin} />
                <Route path='/clientes/edit/:id' component={ClienteEdit} />
                <Route path='/clientes/create' component={ClienteCreate} />
                <Route path='/clientes/show/:id' component={ClienteShow} />
            <Route exact path='/prendas' component={PrendasAdmin} />
                <Route path='/prendas/edit/:id' component={PrendaEdit} />
                <Route path='/prendas/create' component={PrendaCreate} />
                <Route path='/prendas/show/:id' component={PrendaShow} />
            <Route exact path='/datos-servicio' component={DatosServicioAdmin} />
                <Route path='/datos-servicio/edit/:id' component={DatosEdit} />
                <Route path='/datos-servicio/create' component={DatosCreate} />
                <Route path='/datos-servicio/show/:id' component={DatosShow} />
          </Switch>
      </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();