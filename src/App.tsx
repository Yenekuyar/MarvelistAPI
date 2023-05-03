import React, { useEffect, useState } from 'react';
import './App.css';
import AsideOptions from './Components/AsideOptions';
import List from './Components/List';
import axios from 'axios';
import calculateHash from './Components/utils/calculateHash';
import { Outlet } from 'react-router-dom';
import Modal from './Components/Modals/ModalCharacter'

function App() {

  return (
    <div className='app'>
      <aside className="app-aside-bar">
        <AsideOptions />
      </aside>
      <Outlet />
    </div>
  );
}

export default App;