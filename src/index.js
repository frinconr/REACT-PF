import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './clientes/Edit';
import Create from './clientes/Create';
import Show from './clientes/Show';
import ClientesAdmin from './ClientesAdmin';

ReactDOM.render(
  <Router>
      <div>
          <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/clientes' component={ClientesAdmin} />
                <Route path='/clientes/edit/:id' component={Edit} />
                <Route path='/clientes/create' component={Create} />
                <Route path='/clientes/show/:id' component={Show} />
          </Switch>
      </div>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();