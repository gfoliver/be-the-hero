import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/global.scss';

import Login from './components/Login/';
import Register from './components/Register/';
import Dashboard from './components/Dashboard/';
import NewIncident from './components/NewIncident/';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/new-incident" component={NewIncident} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
