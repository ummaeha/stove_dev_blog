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


// class App extends React.Component {
//     componentDidMount() {
//       fetch('http://localhost:4000/api')
//           .then(res=>res.json())
//           .then(data=>this.setState({username:data.username}));
//     }

//     constructor(props) {
//         super(props);
//         this.state = {
//             username:null,
//         };
//     }

//   render() {
//     const {username} = this.state;
//     return (
//         <div className="App">
//           <header className="App-header">
//             {username ? `Hello ${username}` : 'Hello World'}
//           </header>
//         </div>
//     );
//     ;
//   }
// }

// export default App;