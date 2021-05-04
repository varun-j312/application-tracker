import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import DetailedPost from "./components/DetailedPost";
import Compose from "./components/Compose";
import Edit from "./components/Edit";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 id="App-heading">Track your applications</h1>
      </header>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/posts/:userId" component={Posts} />
          <Route
            exact
            path="/post/:userId/:applicationId"
            component={DetailedPost}
          />
          <Route exact path="/compose/:userId" component={Compose} />
          <Route exact path="/edit/:userId/:applicationId" component={Edit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
