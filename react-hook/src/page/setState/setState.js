import React, { Component } from 'react'

export default class App extends Component {
  state = {
    count: 1,
  }
  componentDidMount() {
    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count)
    this.setState({
      count: this.state.count + 1,
    })
    console.log(this.state.count)

    setTimeout(() => {
      this.setState({
        count: this.state.count + 1,
      })
      console.log(this.state.count)
      this.setState({
        count: this.state.count + 1,
      })
      console.log(this.state.count)
    })
  }
  render() {
    return <div>hello</div>
  }
}
