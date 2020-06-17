
import React, { Component,PureComponent } from 'react'

export class Demo extends PureComponent {

    render() {
      const { props } = this;
      console.log('demo render');
      return (
          <div>
              {props.value.a},{props.value.b}
          </div>
      );
  }
}


export default Demo
