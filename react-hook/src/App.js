import React, { Component } from 'react'
import HookEffect from './page/HookEffect'
import HookClick from './page/HookClick'
export default class App extends Component {
  state = {
    count: 0,
  }
  clickHandle = () => {
    this.setState({ count: this.state.count + 1 })
  }

  static getDerivedStateFromProps(props, state) {
    console.log(state.count, '父 getDerivedStateFromProps')
    return { ...state }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(this.state.count, '父 getSnapshotBeforeUpdate')
    return null;
  }

  componentDidMount() {
    console.log(this.state.count, '父 componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.count, '父 shouldComponentUpdate')
    return true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.count, '父 componentDidUpdate')
  }

  render() {
    console.log(this.state.count, '父 render')
    return (
      <div>
        <HookEffect />

        <HookClick />
      </div>
    )
  }
}
