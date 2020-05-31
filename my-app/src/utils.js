export function setProps(dom, oldProps, newProps){
  for (const key in oldProps) {
    
  }
  for (const key in newProps) {
    if(key !== 'children'){
      setProp(dom, key, newProps[key])
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