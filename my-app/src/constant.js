
// 表示这是一个文本元素
export const ELEMENT_TEXT = Symbol.for('ELEMENT_TEXT');
// React需要一个根Fiber
export const TAG_ROOT = Symbol.for('TAG_ROOT');
// 原生节点div span p, 区分函数组件和类组件
export const TAG_HOST = Symbol.for('TAG_HOST');
// 这是文本节点
export const TAG_TEXT = Symbol.for('TAG_TEXT');
// 这是类组件
export const TAG_CLASS = Symbol.for('TAG_CLASS');
// 函数组件
export const TAG__FUNCTION_COMPONENT = Symbol.for('TAG__FUNCTION_COMPONENT')

// 插入节点
export const PLACEMENT = Symbol.for('PLACEMENT');
// 更新节点
export const UPDATE = Symbol.for('UPDATE');
// 删除节点
export const DELETION = Symbol.for('DELETION');
