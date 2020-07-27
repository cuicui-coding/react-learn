import React, { Component } from 'react'


export default class ChildDemo extends Component {
  state={
    count: 0,
  }
  increment = () =>{
    setTimeout(()=>{
        this.setState({count:this.state.count +1})
    }, 1000)
  }
  render() {
    return <div>
      <h1>{this.state.count}</h1>
      <button onClick={this.increment}>类组件</button>
    </div>
  }
}

