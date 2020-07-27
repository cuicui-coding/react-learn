import React, { useState, useRef, useEffect } from 'react'

export default () => {
  const [count, setCount] = useState(0)
  const latestCountRef = useRef(count)

  const clickHandle = () => {
    console.log(count, 'clickHandle')
    setTimeout(() => {
      console.log(count, 'setTimeout')
      setCount(count + 1)
    }, 3000)
  }
  const clickHandle2 = () => {
    console.log(count, 'clickHandle2 无setTimeout')
    setCount(count + 1)
  }

  const clickHandle3 = () => {
    console.log(count, 'clickHandle3')
    setCount(count + 1)
  }
  useEffect(() => {
    latestCountRef.current = count
    setTimeout(() => {
      console.log(
        'count:',
        count,
        'latestCountRef.current:',
        latestCountRef.current,
        'setTimeout'
      )
    }, 3000)
    return () => {}
  }, [count])

  console.log(count, 'render')

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={clickHandle}>click有setTimeout</button>
      <button onClick={clickHandle2}>click无setTimeout</button>
      <button onClick={clickHandle3}>click有useRef</button>
    </div>
  )
}
