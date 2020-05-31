import {
  TAG_ROOT,
  TAG_TEXT,
  TAG_HOST,
  ELEMENT_TEXT,
  PLACEMENT,
} from './constant'
import { setProps } from './utils'

/**
 * 从根节点开始渲染和调度
 * 首次渲染和setState会经历两个阶段
 * 1.render阶段/diff阶段 对比新旧虚拟DOM，进行增量 更新或创建。
 * 这个阶段比较花时间，可以对任务进行拆分，拆分的维度是虚拟DOM,此阶段可以中断和恢复.
 * render阶段的输出结果是effect list,知道哪些节点更新了，哪些节点删除了，哪些节点增加了。
 * render阶段有两个任务，1，根据虚拟DOM生成Fiber树，2，收集effect list
 * 2.commit阶段，进行DOM更新和创建阶段，不能暂停，要一气呵成
 */

let nextUnitOfWork = null //下一个工作单元
let workInProgressRoot = null // rootFiber是应用的根

export function scheduleRoot(rootFiber) {
  // {tag: TAG_ROOT, stateNode: container, props: { children: [element] }}

  workInProgressRoot = rootFiber
  nextUnitOfWork = rootFiber
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }

  while (currentFiber) {
    completeUnitOfWork(currentFiber) // 没有儿子让自己完成
    if (currentFiber.sibling) {
      // 有弟弟就返回弟弟
      return currentFiber.sibling
    }

    currentFiber = currentFiber.return // 找到父亲，让父亲完成completeUnitOfWork。
  }
}

// 在beginWork之后，在完成的时候要收集副作用的fiber,然后组成effect list.
// 每个fiber有两个属性：1.firstEffect指向第一个有副作用的子Fiber,2.lastEffect指向最后一个有副作用的子fiber.
// 中间用nextEffect做成一个单链表，firstEffect=大儿子.nextEffect=二儿子.nextEffect=三儿子
function completeUnitOfWork(currentFiber) {
  let returnFiber = currentFiber.return // 第一个完成A1(TEXT)
  if (returnFiber) {
    // 第一步：这一段是把自己儿子的effect链挂到父亲身上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }

      returnFiber.lastEffect = currentFiber.lastEffect
    }

    // 第二步：这一段是把自己挂到父亲身上
    let effectTag = currentFiber.effectTag // A1
    if (effectTag) {
      // 自己有副作用 A1 firstEffect lastEffect 都指向A1（TEXT）
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      } else {
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}

/**
 * beginWork开始收下线的钱
 * 1.创建真实DOM
 * 2.创建子Fiber
 *
 * completeUnitOfWork把下线的钱收完了
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    // 原生DOM节点
    updateHost(currentFiber)
  }
}

function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    // 如果此Fiber没有就创建DOM节点
    currentFiber.stateNode = createDOM(currentFiber)
  }

  const newChildren = currentFiber.props.children
  reconcilerChildren(currentFiber, newChildren)
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) {
    // div, span
    let stateNode = document.createElement(currentFiber.type) // div
    updateDOM(stateNode, {}, currentFiber.props) // 设置更新属性
    return stateNode
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  setProps(stateNode, oldProps, newProps)
}

function updateHostText(currentFiber) {
  if (!currentFiber.stateNode) {
    // 如果此Fiber没有就创建DOM节点
    currentFiber.stateNode = createDOM(currentFiber)
  }
}

function updateHostRoot(currentFiber) {
  // 1.先处理自己，如果是原生节点就创建真实DOM。 2.创建子fiber
  let newChildren = currentFiber.props.children // [element= <div id='A1'>]
  reconcilerChildren(currentFiber, newChildren)
}

function reconcilerChildren(currentFiber, newChildren) {
  let newChildIndex = 0 // 新子节点的索引
  let prevSibling // 上一个新的子fiber

  // 遍历子虚拟DOM元素数组，为每个子虚拟DOM元素创建子Fiber
  while (newChildIndex < newChildren.length) {
    let newChild = newChildren[newChildIndex] // 取出虚拟DOM节点
    let tag
    if (newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT // 这是一个文本节点
    } else if (typeof newChild.type === 'string') {
      tag = TAG_HOST // 如果type是字符串，那么就是一个原生DOM节点
    }
    // beginWork创建Fiber, 在completeUnitOfWork收集effect
    let newFiber = {
      tag, // TAG_HOST
      type: newChild.type, // div
      props: newChild.props,
      stateNode: null, // div还没有创建DOM元素
      return: currentFiber, // 父Fiber, returnFiber
      effectTag: PLACEMENT, // 副作用标识，render阶段我们要收集副作用 增加、删除、更新
      nextEffect: null, // effect list也是单链表， effect list顺序和完成顺序是一样的，但是节点只放那些出钱的人的Fiber节点,不出钱绕过
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        // 如果当前索引是0说明是太子
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber // 让太子的sibling指向二皇子
      }
      prevSibling = newChild
    }

    newChildIndex++
  }
}

// 循环执行工作 nextUnitOfWork
function workLoop(deadline) {
  let shouldYield = false // 是否让出时间片后者说控制权
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork) // 执行完一个任务后
    shouldYield = deadline.timeRemaining() < 1 // 没有时间的话就让出控制权
  }

  if (!nextUnitOfWork && workInProgressRoot) {
    // 如果时间片到期后，还有任务没有完成，就需要请求浏览器再次调度
    console.log('render阶段结束！')
    commitRoot()
  }
  // 不管是否还有任务，都请求再次调度，每一帧都要执行woorkLoop
  requestIdleCallback(workLoop, { timeout: 500 })
}

function commitRoot() {
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    console.log('commitroot', currentFiber)
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  workInProgressRoot = null
}

function commitWork(currentFiber) {
  if (!currentFiber) return
  let returnFiber = currentFiber.return
  let returnDom = returnFiber.stateNode
  if (currentFiber.effectTag === PLACEMENT) {
    returnDom.appendChild(currentFiber.stateNode)
  }
  currentFiber.effectTag = null
}

/**
 * react告诉浏览器在一帧空闲的时间执行
 *
 * 这里有个优先级的概念先不讲。experationTime
 */
requestIdleCallback(workLoop, { timeout: 500 })
