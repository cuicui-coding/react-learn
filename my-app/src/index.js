import React from './react'
import ReactDOM from './react-dom'

class ClassCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { number: 0 }
  }
  onClick = () => {
    this.setState((state) => ({ number: state + 1 }))
  }
  render() {
    return (
      <div id="number">
        <span>{this.state.number}</span>
        <button onClick={this.onClick}>加+1</button>
      </div>
    )
  }
}
console.log(<ClassCounter />)
ReactDOM.render(<ClassCounter />, document.getElementById('root'))
