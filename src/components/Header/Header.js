import React from 'react'
import { Callout,Elevation } from '@blueprintjs/core';
function Header(props) {
    return (
        <Callout  elevation={Elevation.TWO}>
        <header>
          <h3>To Do List: {props.incomplete} items pending</h3>
        </header>
      </Callout>
    )
}

export default Header
