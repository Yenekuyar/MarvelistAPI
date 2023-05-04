import React, { useEffect, useState } from 'react';
import './App.css';
import AsideOptions from './Components/AsideOptions';
import List from './Components/List';
import axios from 'axios';
import calculateHash from './Components/utils/calculateHash';
import { Outlet, useLocation } from 'react-router-dom';
import Modal from './Components/Modals/ModalCharacter'

function App() {

  const location = useLocation();
  const [showPlaceholder, setShowPlaceholder] = useState(location.pathname === '/');

  useEffect(() => {
    setShowPlaceholder(location.pathname === '/');
  }, [location]);

  return (
    <div className='app'>
      <aside className="app-aside-bar">
        <AsideOptions />
      </aside>
      <Outlet />
      {showPlaceholder && (
        <div className='app-placeholder'>
          <p>To use Marvelist API, go to Marvel API website then insert those keys on the inputs on the left side, submit,
            and finally select a option in the menu on the left side.</p>
        </div>)
      }
    </div>
  );
}

export default App;