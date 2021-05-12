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
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/:userName/:userId/posts" component={Posts} />
          <Route
            exact
            path="/:userName/:userId/post/:applicationId"
            component={DetailedPost}
          />
          <Route exact path="/:userName/:userId/compose" component={Compose} />
          <Route
            exact
            path="/:userName/:userId/edit/:applicationId"
            component={Edit}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
