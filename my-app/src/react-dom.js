import { TAG_ROOT } from './constant'
import { scheduleRoot } from './schedule'
/**
 *
 * @param {*} element
 * @param {*} container
 */
function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // 每个fiber都有一个tag属性标识元素类型
    stateNode: container, // 一般情况下如果这个元素是原生节点的话，stateNode就指向真实DOM元素
    // props.children是数组，里面放的是React元素，虚拟DOM，后面会根据每个React元素创建对应fiber对象
    props: { children: [element] }, // 这个fiber属性对象children属性，里面放的是要渲染的元素
  }
  // 从根节点开始调度
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render,
}
export default ReactDOM

/**
 * reconcilera
 * schedule
 */
