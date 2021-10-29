import React from 'react';
import { Router, Route, Switch } from "react-router-dom"
import './App.css';

class App extends React.Component {
    componentDidMount() {
      fetch('http://localhost:4000/api')
          .then(res=>res.json())
          .then(data=>this.setState({username:data.username}));
    }

    constructor(props) {
        super(props);
        this.state = {
            username:null,
        };
    }

  render() {
    const {username} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            {username ? `Hello ${username}` : 'Hello World'}
          </header>
        </div>
    );
    ;
  }
}

export default App;