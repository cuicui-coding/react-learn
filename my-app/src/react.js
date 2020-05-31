import { ELEMENT_TEXT } from './constant'

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

const React ={
  createElement,
}

export default React;