import React, { useState, useEffect, useLayoutEffect } from 'react'
import ClassChild from './ClassChild'
export default (props) => {
  const [count, setCount] = useState(100)

  useEffect(() => {
    console.log(props.num, '依赖props.num， 子 useEffect 创建')
    return () => {
      console.log(props.num, '依赖props.num， 子 useEffect 销毁')
    }
  }, [props.num])

  useLayoutEffect(() => {
    console.log(props.num, '依赖props.num， 子 useLayoutEffect 创建，')
    return () => {
      console.log(props.num, '依赖props.num， 子 useLayoutEffect 销毁')
    }
  }, [props.num])

  useEffect(() => {
    console.log(count, '依赖count，子 useEffect 创建')
    return () => {
      console.log(count, '依赖count，子 useEffect 销毁')
    }
  }, [count])

  useLayoutEffect(() => {
    console.log(count, '依赖count，子 useLayoutEffect 创建')
    return () => {
      console.log(count, '依赖count，子 useLayoutEffect 销毁')
    }
  }, [count])

  const clickHandle = () => {
    console.log(count, 'click 之前')
    setCount(count + 11)
    console.log(count, 'click 之后')
  }

  console.log(count, '子 render')

  return (
    <div>
      <p>子组件：{count}</p>

      <button onClick={clickHandle}>子组件button</button>

      {/* 孙子节点会引入ClassChild */}
      {count < 112 && <ClassChild num={count} />}

    </div>
  )
}
