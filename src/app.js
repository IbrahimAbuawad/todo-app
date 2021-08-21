
import React from 'react';
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import SettingsProvider from './components/context/Settings';
import ContextAuth from './components/context/ContextAuth';
import ToDo from './components/todo/todo';
import Auth from './components/auth/Auth';
import NavBar from './components/navbar/NavBar';



function App() {


  return (
    <ContextAuth>
      <NavBar/>
      <Auth capability="read">
      <SettingsProvider>
        <ToDo />
      </SettingsProvider>
      </Auth>
    </ContextAuth>
  )
}

export default App
