import React, { useContext } from 'react'
import { AuthContext } from '../context/ContextAuth'

import { If, Else, Then } from 'react-if';

import Signup from '../signup/Signup';




function Auth(props) {




  const { loggedIn, user} = useContext(AuthContext);

  let okToRender = loggedIn && props.capability ? user?.capabilities.includes(props.capability) : false;
  return (
    <div>
      <If condition={okToRender}>

        <Then>
          <div>{props.children}</div>
        </Then>
        <Else>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>To Do List app</h1>
            <p>You need to Signup / Signin to see what to do.</p>
            <Signup />

          </div>
        </Else>
      </If>
    </div>
  )
}

export default Auth


