import React from "react";
import SignIn from "./components/SignInClass";
import Login from "./components/LoginClass";

import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route  path="/category" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
