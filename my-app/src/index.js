import React from './react'
import ReactDOM from './react-dom'

let style = { border: '3px solid red', margin: 5 }

// JSX其实是一种特殊语法，在webapck打包的时候 babel编译的时候会编译成JS

let element = (
  <div id="A1" style={style}>
    A1
    <div id="B1" style={style}>
      B1
      <div id="C1" style={style}>
        C1
      </div>
      <div id="C2" style={style}>
        C2
      </div>
    </div>
    <div id="B2" style={style}>
      B2
    </div>
  </div>
)

// React.createElement(type, props, ...children);
// 虚拟DOM就是一个JS对象，以JS对象的方式描述界面上DOM的样子

// var element = React.createElement("div", {
//     id: "A1"
//   }, React.createElement("div", {
//     id: "B1"
//   }, React.createElement("div", {
//     id: "C1"
//   }), React.createElement("div", {
//     id: "C2"
//   }, " ")), React.createElement("div", {
//     id: "B2"
// }));

console.log(element)
// element = {type:'div', {id: 'A1}, []}

ReactDOM.render(element, document.getElementById('root'))
