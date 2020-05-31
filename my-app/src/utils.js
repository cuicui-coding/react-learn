export function setProps(dom, oldProps, newProps){
  for (const key in oldProps) {
    if(key !== 'children'){
      if(newProps.hasOwnProperty(key)){ // 新老都有props，则更新
        setProp(dom, key, newProps[key])
      }else{
        dom.removeAttribute(key)  // 老props有此属性，新props没有，则删除
      }
    }
  }
  for (const key in newProps) {
    if(key !== 'children'){
      if(!oldProps.hasOwnProperty(key)){ // 老props没有，新props有，则添加此属性
        setProp(dom, key, newProps[key])
      }
    } 
  }
}
function setProp(dom, key, value){
  if(/^on/.test(key)){  // onClick, onChange
    dom[key.toLowerCase()] = value; // 这里先不讲合成事件
  }else if(key === 'style'){
    if(value){
      for (let styleName in value) {
        dom.style[styleName] = value[styleName];
        
      }
    }
  }else{
    dom.setAttribute(key, value)
  }
}