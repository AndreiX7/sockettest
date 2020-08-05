import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { Stream } from "./components";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Stream} />
            <Route component={Stream} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;