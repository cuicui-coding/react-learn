import React, { Component } from 'react'
export default class ClassChild extends Component {
  state = {
    count: 1000,
  }
  clickHandle = () => {
    this.setState({ count: this.state.count + 111 })
  }

  static getDerivedStateFromProps(props, state) {
    console.log(state.count, '孙 getDerivedStateFromProps')
    return { ...state }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(this.state.count, '孙 getSnapshotBeforeUpdate')
    return null;
  }

  componentDidMount() {
    console.log(this.state.count, '孙 componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.count, '孙 shouldComponentUpdate')
    return true
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.state.count, '孙 componentDidUpdate')
  }

  componentWillUnmount(){
    console.log(this.state.count, '孙 componentWillUnmount')

  }

  render() {
    console.log(this.state.count, '孙 render')
    return (
      <div>
        <button onClick={this.clickHandle}>孙组件button</button>
      </div>
    )
  }
}
