import { ELEMENT_TEXT } from './constant'
import { Update } from './UpdateQueue'
import { scheduleRoot, useReducer, useState } from './scheduler'

/**
 * 创建元素（虚拟DOM）的用法
 * @param {*} type  元素的类型 div span p
 * @param {*} config  配置对象 属性 key ref
 * @param  {...any} children  放着所有的儿子，这里会做成一个数组
 */
function createElement(type, config, ...children) {
  delete config.__self
  delete config.__source //表示这个元素是在哪行哪列哪个文件生成的
  return {
    type,
    props: {
      ...config,
      children: children.map((child) => {
        // 做一个兼容处理，如果是react元素就返回自己，如果是文本字符串（children:"C1"）的话就做兼容处理返回对象
        return typeof child === 'object'
          ? child
          : {
              type: ELEMENT_TEXT,
              props: {
                text: child,
                children: [],
              },
            }
      }),
    },
  }
}
/**
 * 每个组件有个更新队列UpdateQueue实例，每次调用setState就会创建更新，先放到更新队列，再放到fiber
 */
class Component {
  constructor(props) {
    this.props = props
    // this.updateQueue = new UpdateQueue();
  }
  setState(payload) {
    //payload可能是对象或函数
    let update = new Update(payload)
    // updateQueue其实放在此类组件对应的fiber节点的internalFiber
    this.internalFiber.updateQueue.enqueueUpdate(update)
    // this.updateQueue.enqueueUpdate(update);

    scheduleRoot() // 从根节点开始调度
  }
}
Component.prototype.isReactComponent = {} // 有isReactCompoent属性说明是类组件，而不是函数组件

const React = {
  createElement,
  Component,
  useReducer,
  useState,
}

export default React
