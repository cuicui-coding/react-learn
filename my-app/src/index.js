import React from './react'
import ReactDOM from './react-dom'

// useState是语法糖，基于useReducer实现
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
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { count: state.count + 1 }
    default:
      return state
  }
}
const ADD = 'ADD'
function FunctionCounter() {
  const [numberState, setNumberState] = React.useState({ number: 0 })
  const [countState, dispatch] = React.useReducer(reducer, { count: 0 })

  return (
    <div>
      <div id="number">
        <span>{numberState.count}</span>
        <button
          onClick={() => setNumberState({ number: numberState.number + 1 })}
        >
          加1
        </button>
      </div>
      <div id="counter">
        <span>{countState.count}</span>
        <button onClick={() => dispatch({ type: ADD })}>加1</button>
      </div>
    </div>
  )
}

ReactDOM.render(
  <FunctionCounter name="计数器" />,
  document.getElementById('root')
)
