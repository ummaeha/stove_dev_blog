import React, { Component } from 'react'

export default class Testmain extends Component {
  state = {
    id : "",
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange} name ="id"/>
        <button>Submit</button>
        <h1>{this.state.id}</h1>
      </div>
    )
  }
}

