import React, {useEffect, useState} from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Post from "./pages/Post";
import './App.css';

function App() {

  return (
      <div className="App" >
          <Router history={history}>
              <div className="main-container">
                  <Switch>
                      <div className="main-body">
                          <Route path="/" exact component={Main} />
                          <Route path="/posts" exact component={Create} />
                          <Route path="/posts/:postId" exact component={Post} />
                      </div>
                  </Switch>
              </div>
          </Router>
      </div>
  )
}

export default App
