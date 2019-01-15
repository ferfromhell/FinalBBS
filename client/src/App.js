import React, { Component } from 'react';
import  Home from './components/Home';
import Dashboard from './components/Dashboard';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
         <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
