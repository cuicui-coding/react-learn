import React, {useState} from 'react'

import Demo from './page/Demo'

export default function Test() {
  const [state, setState] = useState({ a: 1, b: 1, c: 1 });
  const [value, setValue] = useState(11);
  console.log('render',state)
  return (
      <div>
          <div>
              state{state.a},{state.b}
          </div>
          <button
              type="default"
              onClick={() => {
                  //@ts-ignore
                  setState({ a: 2});
                  //@ts-ignore
                  setState({  b: 2 });
                  console.log(state, 'state');
              }}
          >
              测试
          </button>
          <hr />
          <div>value{value}</div>
          <button
              type="default"
              onClick={() => {
                  setValue(value + 1);
              }}
          >
              测试
          </button>
          <Demo value={state} />
      </div>
  );
}